import React from "react";
import { AiOutlineClose } from "react-icons/ai";
export default function SelectedMembers({ handleRemoveMember, member }) {
  return (
    <div className="flex items-center rounded-full bg-slate-300">
      <img
        className="h-7 w-7 rounded-full"
        src={
          member.profile_picture ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
        }
        alt=""
      />
      <p className="px-2">{member.full_name}</p>
      <AiOutlineClose
        onClick={handleRemoveMember}
        className="cursor-pointer px-1"
      />
    </div>
  );
}
