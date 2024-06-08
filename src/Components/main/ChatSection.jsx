import { AiOutlineSearch } from "react-icons/ai";
import { BsSend, BsThreeDotsVertical } from "react-icons/bs";
import MessageCard from "../MessageCard/MessageCard";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../../Redux/Message/Action";
import { useState,useEffect } from "react";

export default function ChatSection({ currentChat }) {
  const [content, setContent] = useState("");
  const { auth, message } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleCreateNewMessage = () => {
    console.log('send')
    dispatch(
      createMessage({
        token,
        data: { chatId: currentChat.id,userId:auth.reqUser?.id, content: content },
      }),
    );
  };
  
  useEffect((

    
  )=>{console.table(message.messages)
    console.log('currentChat',currentChat)},[message,currentChat])

  return (
    <div className=" h-full w-full bg-blue-200 ">
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
                  : auth.reqUser?.id !== currentChat.users[0]?.id
                    ? currentChat.users[0].profilePicture
                    ||
                      "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"
                    : currentChat.users[1].profilePicture
                    ||
                      "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"
              }
              alt=""
            />
            <p>
              {currentChat.group
                ? currentChat.name
                : auth.reqUser?.id === currentChat.users[0].id
                  ? currentChat.users[1].fullName
                  : currentChat.users[0].fullName}
            </p>
          </div>
          {/* <div className="flex items-center space-x-4 px-3 py-3 ">
            <AiOutlineSearch />
            <BsThreeDotsVertical />
          </div> */}
        </div>
      </div>

      {/*messages section */}
      <div className=" h-[80%] w-full overflow-y-scroll  px-10 ">
        <div className="mt-20 flex flex-col justify-center space-y-1  py-2 ">
          {
          message.messages.length > 0 &&
            message.messages.map((item, i) => {
            
              return (
                <MessageCard

                timeStamp={item.timestamp}
                messageSenderName={item.userName}
                  key={i}
                  isReqUserMessage={auth.reqUser?.id !== item.userId}
                  content={item.content}
                />
              );
            })}

{
          message.messages.length === 0 &&
         <p>no messages yet</p>  }
        </div>
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
        <BsSend onClick={()=>{handleCreateNewMessage();               

              setContent("");}} />
      </div>
    </div>
  );
}
