import "./HomePage.css";
import { print } from "../utils/print";
import { useEffect, useState } from "react";
import CreateGroup from "./Group/CreateGroup";
import Profile from "./Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../Redux/Auth/Action";
import { getUsersChat } from "../Redux/Chat/Action";
import { useNavigate } from "react-router-dom";
import ChatSection from "./main/ChatSection";
import Chats from "./main/Chats";
import { getAllMessages } from "../Redux/Message/Action";

export default function HomePage() {
  const [currentChat, setCurrentChat] = useState(null);
  const [sidbarNav, setSidbarNav] = useState("chats");
  const { auth, chat, message } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // get the chats for the current user when ever he created a new group or a new chat or receive a new message

  useEffect(() => {
    print.effect(
      "get the chats for the current user when ever he created a new chat or a new chat",
    );
    if (token && auth.reqUser?.id)
      dispatch(getUsersChat({ token, userId: auth.reqUser?.id }));
  }, [chat.createdGroup, chat.createdChat, message.newMessage]);

  // get the messages for the current chat after clicking on chat card and setting the current chat por create a new message
  useEffect(() => {
    print.effect(
      "get the messages for the current chat after clicking on chat card",
    );

    if (currentChat?.id)
      dispatch(getAllMessages({ chatId: currentChat.id, token }));
  }, [currentChat, message.newMessage]);

  // get the current user info when ever the token changes, or the user info updated
  useEffect(() => {
    print.effect("get the current user");
    console.log(auth);
    if (token) dispatch(currentUser(token));
  }, [token, auth.updatedUser]);

  // detect if the user is not logged in yet
  useEffect(() => {
    print.effect("dedicate if the user is not logged in yet");

    if (!auth.reqUser?.fullName) {
      navigate("/signup");
    }
  }, [auth.reqUser]);

  print.comp("HomePageRf");

  return (
    <>
      <div className=" relative h-screen w-screen  bg-slate-500 ">
        <div className="h-[15vh] bg-[#00a884] "></div>
        <div className="h-[85vh] bg-[#e8e9ec]"></div>
        <div className="absolute right-0 top-0 mx-[2.5vw] my-[2.5vh]  flex h-[95vh] w-[95vw]  bg-[#f0f2f5]">
          {/* nav */}
          <div className="w-[25%] min-w-[200px]">
            {sidbarNav == "profile" && <Profile setSidbarNav={setSidbarNav} />}
            {sidbarNav === "group" && (
              <CreateGroup setSidbarNav={setSidbarNav} />
            )}
            {sidbarNav == "chats" && (
              <Chats
                setSidbarNav={setSidbarNav}
                handleCurrentChat={setCurrentChat}
                chatsArr={chat.chats}
              />
            )}
          </div>
          {/* main */}
          <div className="w-[75%] bg-green-700 ">
            {currentChat ? (
              <ChatSection key={currentChat.id} currentChat={currentChat} />
            ) : (
              <LandingPage />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function LandingPage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[hsl(0,0%,100%)]">
      <div className="max-w-[70%] text-center">
        <img
          src="https://res.cloudinary.com/zarmariya/image/upload/v1662264838/whatsapp_multi_device_support_update_image_1636207150180-removebg-preview_jgyy3t.png"
          alt="landing page pic"
        />
        <h1 className="text-4xl text-gray-600">whatsApp Web</h1>
        <p className="my-9">
          send and as message without keeping your phone online. Use WhatsApp on
          Up to 4 Linked devices and 1 phone at the same time.
        </p>
      </div>
    </div>
  );
}
