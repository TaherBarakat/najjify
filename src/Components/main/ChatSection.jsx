import { AiOutlineSearch } from "react-icons/ai";
import { BsSend, BsThreeDotsVertical } from "react-icons/bs";
import MessageCard from "../MessageCard/MessageCard";
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../../Redux/Message/Action";
import { useState } from "react";

export default function ChatSection({ currentChat }) {
  const [content, setContent] = useState("");
  const { auth, message } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const handleCreateNewMessage = () => {
    dispatch(
      createMessage({
        token,
        data: { chatId: currentChat.id, content: content },
      }),
    );
  };

  return (
    <div className=" h-full w-full bg-blue-200 ">
      {/* header */}
      <div className="h-[10%] w-full bg-[#fef2fs]">
        <div className="flex justify-between">
          <div className="flex items-center space-x-4 px-3 py-3">
            <img
              className="h-10 w-10 rounded-full"
              src={
                currentChat.is_Group
                  ? currentChat.chat_image ||
                    "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"
                  : auth.reqUser?.id !== currentChat.users[0]?.id
                    ? currentChat.users[0].profile_picture ||
                      "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"
                    : currentChat.users[1].profile_picture ||
                      "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"
              }
              alt=""
            />
            <p>
              {currentChat.is_Group
                ? currentChat.chat_name
                : auth.reqUser?.id === currentChat.users[0].id
                  ? currentChat.users[1].full_name
                  : currentChat.users[0].full_name}
            </p>
          </div>
          <div className="flex items-center space-x-4 px-3 py-3 ">
            <AiOutlineSearch />
            <BsThreeDotsVertical />
          </div>
        </div>
      </div>

      {/*messages section */}
      <div className=" h-[80%] w-full overflow-y-scroll  px-10 ">
        <div className="mt-20 flex flex-col justify-center space-y-1  py-2 ">
          {message.messages.length > 0 &&
            message.messages.map((item, i) => {
              return (
                <MessageCard
                  key={item}
                  isReqUserMessage={auth.reqUser.id !== item.user.id}
                  content={item.content}
                />
              );
            })}
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
        <BsSend />
      </div>
    </div>
  );
}
