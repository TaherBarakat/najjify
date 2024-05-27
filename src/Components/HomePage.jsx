import "./HomePage.css";

import { useState } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsEmojiSmile, BsFilter, BsSearch } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { BsThreeDotsVertical } from "react-icons/bs";

import ChatCard from "./ChatCard/ChatCard";
import MessageCard from "./MessageCard/MessageCard";

import Profile from "./Profile/Profile";

export default function HomePage() {
  const [queries, setQueries] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const handleClickOnCard = () => {
    setCurrentChat(true);
  };

  const handleSearch = () => {};

  const handleCreateNewMessage = () => {};
  const handleNavigate = () => {
    setIsProfile(true);
  };

  const handleCloseOpenProfile = () => {
    setIsProfile(false);
  };
  return (
    <>
      <div className="relative ">
        <div className=" w-full bg-[#00a884] py-14 "></div>
        <div className="absolute left-[2vw]  top-[5vh] flex h-[90vh] w-[96vw] bg-[#f0f2f5]">
          <div className="left h-full w-[30%] bg-[#e8e9ec]">
            {/* profile */}
            {isProfile && (
              <div className="h-full w-full">
                <Profile handleCloseOpenProfile={handleCloseOpenProfile} />
              </div>
            )}

            {!isProfile && (
              <div className="w-full">
                {/* home */}

                <div className="flex  items-center justify-between  p-3  ">
                  <div
                    onClick={handleNavigate}
                    className="flex items-center  space-x-3  "
                  >
                    <img
                      className="cursor-pointer” alt= h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGljfGVufDB8fDB8fHww"
                    />
                    <p>username</p>
                  </div>
                  <div className="flex space-x-3 text-2xl  ">
                    <TbCircleDashed />
                    <BiCommentDetail />
                  </div>
                </div>

                {/* ,,,,,,,,,,,, */}
                <div className="relative flex items-center justify-center bg-white  px-3 py-4">
                  <input
                    className=" w-[93%]  rounded-md  border-none   bg-slate-200   py-2 pl-9  outline-none   "
                    type="text"
                    placeholder="Search or start new chat"
                    onChange={(e) => {
                      setQueries(e.target.value);
                      handleSearch(e.target.value);
                    }}
                    value={queries}
                  />
                  <AiOutlineSearch className="absolute left-5  top-7" />
                  <div>
                    <BsFilter className="ml-4 text-3xl" />
                  </div>
                </div>
                {/* all users */}

                <div className="h-[72vh] overflow-y-scroll  bg-white px-3 ">
                  {queries &&
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item, index) => {
                      return (
                        <div
                          key={index}
                          className=""
                          onClick={handleClickOnCard}
                        >
                          <hr />
                          <ChatCard />
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
          {/* default whats up page */}

          {!currentChat && (
            <div className="flex h-full w-[70%] flex-col items-center justify-center ">
              <div className="max-w-[70%] border  text-center">
                <img
                  src="https://res.cloudinary.com/zarmariya/image/upload/v1662264838/whatsapp_multi_device_support_update_image_1636207150180-removebg-preview_jgyy3t.png"
                  alt=""
                />
                <h1 className="text-4xl text-gray-600">whatsApp Web</h1>
                <p className="my-9">
                  send and as message without keeping your phone online. Use
                  WhatsApp on Up to 4 Linked devices and 1 phone at the same
                  time.
                </p>
              </div>
            </div>
          )}
          {/* messages part */}

          {currentChat && (
            <div className="relative w-[70%] bg-blue-200 ">
              <div className="header Mbg-[#fef2fs] absolute top-0 w-full">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-4 px-3 py-3">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://cdn.pixabay.com/photo/2023/03/29/10/27/hotel-7885138__ 340. jeg"
                      alt=""
                    />
                    <p>username</p>
                  </div>
                  <div className="flex items-center space-x-4 px-3 py-3 ">
                    <AiOutlineSearch />
                    <BsThreeDotsVertical />
                  </div>
                </div>
              </div>

              {/* ////////////////////////// messages section */}
              <div className=" h-[85vh] overflow-y-scroll px-10 ">
                <div className="mt-20 flex flex-col justify-center space-y-1 border py-2 ">
                  {[1, 1, 1, 1, 1].map((item, i) => {
                    return (
                      <MessageCard
                        key={item}
                        isReqUserMessage={i % 2 === 0}
                        content="message"
                      />
                    );
                  })}
                </div>
              </div>

              {/* footer message */}
              <div className="footer absolute bottom-0 w-full bg-[#f0f2f5] py-3 text-2xl ">
                <div className="relative flex items-center justify-between px-5">
                  <BsEmojiSmile className="cursor-pointer" />
                  <ImAttachment />
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
                  <BsSearch />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
