import React from "react";

export default function ChatCard({ userImg, name }) {
  return (
    <div className="group  flex cursor-pointer items-center justify-center   py-2  ">
      <div className="w-20%">
        <img
          className="h-14 w-14 rounded-full "
          src={
            userImg ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }
          alt="profile picture"
        />
      </div>
      <div className="w-[80%] pl-9 ">
        <div className="flex items-center justify-between">
          <p className="text-lg">{name}</p>
          <p className="text-sm">timeStamp</p>
        </div>
        <div className="flex items-center justify-between">
          <p>message...</p>
          <div className="flex items-center space-x-2 ">
            <p className="rounded-full  bg-green-500 px-2 py-1 text-xs text-white ">
              5
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
