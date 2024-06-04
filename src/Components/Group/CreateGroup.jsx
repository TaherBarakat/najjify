import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useState } from "react";
import SelectedMembers from "./SelectedMembers";
import ChatCard from "../ChatCard/ChatCard";
import NewGroup from "./NewGroup";
import { useDispatch, useSelector } from "react-redux";
import { searchUser } from "../../Redux/Auth/Action";

export default function CreateGroup({ setSidbarNav }) {
  const [newGroup, setNewGroup] = useState(false);
  const [query, setQuery] = useState("");
  const [groupMembers, setGroupMembers] = useState(new Set());
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  function handleRemoveMember(item) {
    groupMembers.delete(item);
    setGroupMembers(groupMembers);
  }
  function handleSearch(keyword) {
    dispatch(searchUser({ keyword: query, token }));
  }
  return (
    <div className="h-full w-full">
      {!newGroup && (
        <div>
          <div className="flex items-center space-x-10 bg-[#008069] px-10 pb-5 pt-16 text-white">
            <BsArrowLeft
              onClick={() => setSidbarNav("chats")}
              ClassName="cursor-pointer text-2xl font-bold"
            />

            <p className="text-xl font-semibold">Add Group Participates</p>
          </div>
          {/* ------------------------------------------------------------------------------------------------------------ */}
          <div className="relative bg-white px-4 py-4">
            <div className="flex flex-wrap space-x-2 space-y-1">
              {groupMembers.size > 0 &&
                Array.from(groupMembers).map((item, i) => (
                  <SelectedMembers
                    key={i}
                    handleRemoveMember={() => handleRemoveMember(item)}
                    member={item}
                  />
                ))}
            </div>
            <input
              type="text"
              onChange={(e) => {
                handleSearch(e.target.value);
                setQuery(e.target.value);
              }}
              className="w-[93%] border-b border-[#888888] p-2 outline-none"
              placeholder="Search user"
              value={query}
            />
          </div>
          {/* ------------------------------------------------------------------------------------------------------------ */}
          <div className="h-[50.2vh] overflow-y-scroll bg-white ">
            {query &&
              auth.searchUser?.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    groupMembers.add(item);
                    setGroupMembers(groupMembers);
                    setQuery("");
                  }}
                >
                  <hr />
                  <ChatCard
                    userImg={item.profile_picture}
                    name={item.full_name}
                  />
                </div>
              ))}
          </div>{" "}
          {/* ------------------------------------------------------------------------------------------------------------ */}
          <div className="bottom-10 flex items-center  justify-center bg-slate-200 py-10 ">
            <div
              className="cursor-pointer rounded-full bg-green-600 p-4 "
              onClick={() => {
                setNewGroup(true);
              }}
            >
              <BsArrowRight className="text-3xl font-bold text-white" />
            </div>
          </div>
        </div>
      )}
      {newGroup && (
        <NewGroup
          goBack={setNewGroup}
          groupMembers={groupMembers}
          setSidbarNav={setSidbarNav}
        />
      )}
    </div>
  );
}
