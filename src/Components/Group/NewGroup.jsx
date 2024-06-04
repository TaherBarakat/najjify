import React from "react";
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { createGroupChat } from "../../Redux/Chat/Action";
export default function NewGroup({ goBack, groupMembers, setSidbarNav }) {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupImg, setGroupImg] = useState(null);
  const dispatch = useDispatch();

  function uploadToCloudinary(pics) {
    setIsImageUploading(true);
    try {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "whatsapp");
      data.append("cloud_name", "dxq3gmkuw");

      fetch("https://api.cloudinary.com/v1_1/dxq3gmkuw/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setGroupImg(data.url.toString());
          setIsImageUploading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }
  function handleCreateGroup() {
    let userIds = [];
    for (let user of groupMembers) {
      userIds.push(user.id);
    }
    const data = {
      group: { userIds, chat_name: groupName, chat_image: groupImg },
      token: localStorage.getItem("token"),
    };
    dispatch(createGroupChat(data));
    setSidbarNav("chats");
  }

  return (
    <div className="h-full w-full">
      <div className="Mtext-white flex items-center space-x-10 bg-[#008069] px-10 pb-5 pt-16">
        <BsArrowLeft
          className="cursor-pointer text-2xl font-bold"
          onClick={() => goBack(false)}
        />

        <p className="text-x1 font-semibold">New Group</p>
      </div>
      <div className="my-12 flex flex-col items-center justify-center">
        <label htmlFor="imgInput" className="relative">
          <img
            src={
              groupImg ||
              "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"
            }
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
          onChange={(e) => uploadToCloudinary(e.target.files[0])}
          // value={""}
        />
      </div>
      <div className="flex w-full flex-col items-center justify-between  px-5 py-2">
        <input
          onChange={(e) => setGroupName(e.target.value)}
          className="  w-full border-b-2 border-green-700 bg-transparent px-2 outline-none"
          placeholder="Group Subject"
          value={groupName}
          type="text"
        />
        {groupName && (
          <button
            className="m-2 cursor-pointer rounded-full bg-[#0c977d] p-4"
            onClick={handleCreateGroup}
          >
            <BsCheck2 className="text-3xl font-bold text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
