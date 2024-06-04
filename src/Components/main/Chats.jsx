import { BsFilter } from "react-icons/bs";
import MenuMui from "./MenuMui";
import { BiCommentDetail } from "react-icons/bi";
import ChatCard from "../ChatCard/ChatCard";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction, searchUser } from "../../Redux/Auth/Action";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Chats({ setSidbarNav, handleCurrentChat, chatsArr }) {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [queries, setQueries] = useState("");

  const handleSearch = (keyword) => {
    dispatch(searchUser({ keyword, token }));
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/signup");
  };
console.log(chatsArr)
  return (
    <>
      {/* header */}

      <div className="flex   h-[10%] items-center justify-between  p-3  ">
        <div
          onClick={() => setSidbarNav("profile")}
          className="flex cursor-pointer  items-center  space-x-3"
        >
          <img
            className="alt= h-10 w-10 cursor-pointer rounded-full"
            src={
              auth.reqUser?.profilePicture ||
              `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`
            }
          />
          <p>{auth.reqUser?.fullName}</p>
        </div>
        <div className="flex space-x-3 text-2xl  ">
          {/* <TbCircleDashed /> */}
          <BiCommentDetail />
          <MenuMui handleNav={setSidbarNav} handleLogout={handleLogout} />
        </div>
      </div>

      {/* search */}
      <div className="flex   h-[10%] items-center justify-center bg-white  px-3 py-4">
        <input
          className=" w-[90%]  rounded-md  border-none   bg-slate-200   py-2 pl-9  outline-none   "
          type="text"
          placeholder="Search or start new chat"
          onChange={(e) => {
            setQueries(e.target.value);
            handleSearch(e.target.value);
          }}
          value={queries}
        />
        <BsFilter className="ml-4 text-3xl" />
      </div>
      {/* all users */}

      <div className="h-[80%] overflow-y-scroll  bg-white px-3 ">
        {queries &&
          auth.searchUser?.map((item, index) => {
            return (
              <div key={index} onClick={() => handleCurrentChat(item)}>
                <hr />
                <ChatCard
                  name={item.full_name}
                  userImg={item.profile_picture}
                />
              </div>
            );
          })}

        {/* ---------------------------------------------- */}
        {chatsArr?.length > 0 &&
          queries == "" &&
          chatsArr?.map((item, index) => {
            return (
              <div
                key={index}
                className=""
                onClick={() => handleCurrentChat(item)}
              >
                <hr />

                {item.group ? (<>
                {/* <p>isGroup</p> */}
                  <ChatCard   name={item.chat_name} userImg={item.chat_image} />
                </>
                ) : (<>
                
                  {/* <p>isnotGroup</p> */}

                  <ChatCard
                    isChat
                    name={
                      auth.reqUser?.id !== item.users[0]?.id
                        ? item.users[0].fullName
                        : item.users[1].fullName
                      }
                    userImg={
                      auth.reqUser?.id !== item.users[0]?.id
                      ? item.users[0].profilePicture ||
                      "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"
                      : item.users[1].profilePicture ||
                      "https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579__340.png"
                    }
                    />
                    </>
                )}

                {/* <ChatCard chatName={item.chat} item={item} /> */}
              </div>
            );
          })}
      </div>
    </>
  );
}
