import React from "react";

export default function ChatCard() {
  return (
    <div className="group  flex cursor-pointer items-center justify-center   py-2  ">
      <div className="w-20%">
        <img
          className="h-14 w-14 rounded-full "
          src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGljfGVufDB8fDB8fHww"
          alt=""
        />
      </div>
      <div className="w-[80%] pl-9 ">
        <div className="flex items-center justify-between">
          <p className="text-lg">user name </p>
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
