import "../../Components/HomePage.css";
import webSocketService from "../../utils/WebSocketService";
import SockJS from "sockjs-client/dist/sockjs";
// import { over } from "stompjs";

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
  const { auth, message } = useSelector((store) => store);
  const dispatch = useDispatch();
  // --------
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  // ----------
  const token = localStorage.getItem("token");
  // to always scroll to bottom
  // to always scroll to bottom
  // to always scroll to bottom
  // to always scroll to bottom
  // to always scroll to bottom

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [message, messages]);
  //---------------------------
  //---------------------------
  //---------------------------
  //---------------------------

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

  // useEffect(() => {
  //   console.table(message.messages);
  //   console.log("currentChat", currentChat);
  // }, [message, currentChat]);

  // useEffect(() => {
  //   // Ensure the URL uses http or https
  //   const socket = new SockJS("http://localhost:8080/ws");

  //   socket.onopen = () => {
  //     console.log("Socket is open");
  //   };

  //   socket.onmessage = (e) => {
  //     console.log("Message received:", e.data);
  //   };

  //   socket.onclose = () => {
  //     console.log("Socket is closed");
  //   };

  //   return () => {
  //     socket.close();
  //   };
  // }, []);
  // const sock = new SockJS("http://localhost:8080/ws");
  // console.log("sockkkkkkkkkkkkk", sock);
  print.comp("sock");

  useEffect(() => {
    const token = localStorage.getItem("token");
    webSocketService.connect({ Authorization: `${token}` }, () => {
      const subscription = webSocketService.subscribe(
        `/topic/chat/${currentChat.id}`,
        (message) => {
          setMessages((prevMessages) => {
            dispatch(getUsersChat({ token, userId: auth.reqUser?.id }));
            dispatch(getAllMessages({ chatId: currentChat.id, token }));

            return [...prevMessages, message];
          });
        },
      );
      setConnected(true);

      return () => {
        if (subscription) subscription.unsubscribe();
        webSocketService.disconnect();
        setConnected(false);
      };
    });
  }, [currentChat]);

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
                    auth.reqUser?.id !== item.receiverId
                      ? auth.reqUser?.fullName
                      : currentChat.name
                  }
                  isReqUserMessage={auth.reqUser?.id == item.receiverId}
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
        <BsSend />
      </div>
    </div>
  );
}
