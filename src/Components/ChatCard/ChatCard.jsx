import React from "react";
import { formatTimestamp } from "../../utils/utils";
export default function ChatCard({ chat, userCard }) {
  return !userCard ? (
    <div className="  flex h-[100%] cursor-pointer items-center justify-center  py-2  ">
      <div className="flex w-[20%] items-center justify-center">
        <img
          className="aspect-square rounded-full p-0  md:p-1 "
          src={
            chat.group
              ? chat.image ||
                "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"
              : chat.image ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt="profile picture"
        />
      </div>
      <div className=" w-[80%] flex-col  items-center justify-center pl-5">
        <div className=" flex  h-[50%] w-full items-center justify-between">
          <p className=" text-[1.9vw]  md:text-[1.3vw]">{chat.name}</p>
          <p className="text-[1.3vw]  text-neutral-500  md:text-sm ">
            {formatTimestamp(chat.lastMessageTimeStamp).includes("NaN")
              ? ""
              : formatTimestamp(chat.lastMessageTimeStamp)}
          </p>
        </div>
        <div className="flex h-[50%] w-full items-center justify-between overflow-hidden">
          <p className="h-full w-full truncate text-[1.5vw] text-neutral-500   md:text-sm">
            {chat.lastMessage ? chat.lastMessage : "No messages yet ..."}
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="  flex h-[100%] cursor-pointer items-center justify-center  py-2  ">
      <div className="flex w-[20%] items-center justify-center">
        <img
          className="aspect-square rounded-full p-0  md:p-1 "
          src={
            chat.profilePicture ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt="profile picture"
        />
      </div>
      <div className=" w-[80%] flex-col  items-center justify-center pl-5">
        <div className=" flex  h-[50%] w-full items-center justify-between">
          <p className=" text-[1.9vw]  md:text-[1.3vw]">{chat.fullName}</p>
          {/* <p className="text-[1.3vw]  text-neutral-500  md:text-sm ">
            {formatTimestamp(chat.lastMessageTimeStamp).includes("NaN")
              ? ""
              : formatTimestamp(chat.lastMessageTimeStamp)}
          </p> */}
        </div>
        <div className="flex h-[50%] w-full items-center justify-between overflow-hidden">
          <p className="h-full w-full truncate text-[1.5vw] text-neutral-500   md:text-sm">
            {chat.username}
          </p>
        </div>
      </div>
    </div>
  );
}
