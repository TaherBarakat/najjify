import React from "react";
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
export default function NewGroup() {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [groupName, setGroupName] = useState("");
  return (
    <div className="h-full w-full">
      <div className="Mtext-white flex items-center space-x-10 bg-[#008069] px-10 pb-5 pt-16">
        <BsArrowLeft className="cursor-pointer text-2xl font-bold" />

        <p className="text-x1 font-semibold">New Group</p>
      </div>
      <div className="my-12 flex flex-col items-center justify-center">
        <label htmlFor="imgInput" className="relative">
          <img
            src="https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"
            alt=""
          />
          {isImageUploading && (
            <CircularProgress className="absolute left-[6rem] top-[5rem]" />
          )}
        </label>
        <input
          type="file"
          id="imgInput"
          className="hidden"
          onChange={() => console.log("image on change")}
          value={""}
        />
      </div>
      <div className="flex w-full items-center justify-between px-5 py-2">
        <input
          onChange={(e) => setGroupName(e.target.value)}
          className="  w-full border-b-2 border-green-700 bg-transparent px-2 outline-none"
          placeholder="Group Subject"
          value={groupName}
          type="text"
        />
        {groupName && (
          <div className="items-center justify-center rounded-full  bg-slate-200 py-10  ">
            <button>
              <div className="rounded-full bg-[#0c977d] p-4">
                <BsCheck2 className="text-3xl font-bold text-white" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
