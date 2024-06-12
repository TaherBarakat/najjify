import "../../Components/HomePage.css";
import webSocketService from "../../utils/WebSocketService";
import SockJS from "sockjs-client/dist/sockjs";

import { print } from "../../utils/print";
import { AiOutlineSearch } from "react-icons/ai";
import { BsSend, BsThreeDotsVertical } from "react-icons/bs";
import MessageCard from "../MessageCard/MessageCard";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, getAllMessages } from "../../Redux/Message/Action";
import { useEffect, useRef, useState } from "react";
import { getUsersChat } from "../../Redux/Chat/Action";

export default function ChatSection({ currentChat }) {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const { auth, message } = useSelector((store) => store);
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  // to always scroll to bottom
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [message, messages]);

  const handleCreateNewMessage = () => {
    webSocketService.send("/app/chat", { chatId: currentChat.id, content });
    dispatch(
      createMessage({
        token,
        data: {
          chatId: currentChat.id,
          content: content,
        },
      }),
    );
  };
  // initiate the websocket and sub scribe to the socket related to the current chat
  useEffect(() => {
    let subscription = null;
    const token = localStorage.getItem("token");
    webSocketService.connect({ Authorization: `${token}` }, () => {
      subscription = webSocketService.subscribe(
        `/topic/chat/${currentChat.id}`,
        (message) => {
          setMessages((prevMessages) => {
            return [...prevMessages, message];
          });
        },
      );
      setConnected(true);
    });
    // cleaning function to put the connection down before initiate a new connection
    return () => {
      if (subscription) subscription.unsubscribe();
      webSocketService.disconnect();
      setConnected(false);
    };
  }, []);
  // get a new chats and messages after receiving a new message or send one

  useEffect(() => {
    const time = setTimeout(() => {
      dispatch(getAllMessages({ chatId: currentChat.id, token }));
      dispatch(getUsersChat({ token, userId: auth.reqUser?.id }));
    }, 100);
    () => {
      clearTimeout(time);
    };
  }, [messages]);

  print.comp("sock");
  return (
    <div className=" h-full w-full bg-white ">
      {/* header */}
      <div className="h-[10%] w-full bg-[#fef2fs]">
        <div className="flex justify-between">
          <div className="flex items-center space-x-4 px-3 py-3">
            <img
              className="h-10 w-10 rounded-full"
              src={
                currentChat.group
                  ? currentChat.image ||
                    "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"
                  : currentChat.image ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="chat picture"
            />
            <p>{currentChat.name}</p>
          </div>
          <div className="flex items-center space-x-4 px-3 py-3 ">
            {/* <AiOutlineSearch />
            <BsThreeDotsVertical /> */}
          </div>
        </div>
      </div>

      {/*messages section */}
      <div className="chatbg h-[80%] w-full overflow-y-scroll  px-7 ">
        <div className="mt-5 flex flex-col justify-center space-y-1  py-2 ">
          {message.messages?.length > 0 &&
            message.messages?.map((item, i) => {
              return (
                <MessageCard
                  key={i}
                  timeStamp={item.timestamp}
                  messageSenderName={
                    currentChat.group
                      ? item.senderName
                      : auth.reqUser?.id !== item.receiverId
                        ? auth.reqUser?.fullName
                        : currentChat.name
                  }
                  isReqUserMessage={
                    currentChat.group
                      ? auth.reqUser?.id !== item.senderId
                      : auth.reqUser?.id == item.receiverId
                  }
                  content={item.content}
                />
              );
            })}

          {message.messages?.length === 0 && <h1>no messages yet</h1>}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* footer section */}
      <div className=" flex h-[10%]  w-full items-center justify-around bg-[#f0f2f5] px-5 py-3 text-2xl ">
        {/* <BsEmojiSmile className="cursor-pointer" /> */}
        {/* <ImAttachment /> */}
        <input
          className="w-[85%] rounded border-none bg-white py-2 pl-4 outline-none "
          type="text"
          onChange={(e) => setContent(e.target.value)}
          placeholder="type message"
          value={content}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleCreateNewMessage();
              setContent("");
            }
          }}
        />
        <BsSend
          className="cursor-pointer"
          onClick={() => {
            handleCreateNewMessage();
            setContent("");
          }}
        />
      </div>
    </div>
  );
}
