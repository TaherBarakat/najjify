import React from "react";
import { AiOutlineClose } from "react-icons/ai";
export default function SelectedMembers({ handleRemoveMember, member }) {
  return (
    <div className="flex items-center rounded-full bg-slate-300">
      <img
        className="rounded- full h-7 w-7"
        src="https://cdn.pixabay.com/photo/2023/05/10/18/5/blackbird-7984650_640.jpg"
        alt=""
      />
      <p className="px-2">{member}</p>
      <AiOutlineClose
        onClick={handleRemoveMember}
        className="cursor-pointer px-1"
      />
    </div>
  );
}
