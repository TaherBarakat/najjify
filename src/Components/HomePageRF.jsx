import "./HomePage.css";

import { useEffect, useState } from "react";
import CreateGroup from "./Group/CreateGroup";
import Profile from "./Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logoutAction, searchUser } from "../Redux/Auth/Action";
import { useNavigate } from "react-router-dom";
import ChatSection from "./main/ChatSection";
import Chats from "./main/Chats";
import { createChat, getUsersChat } from "../Redux/Chat/Action";
import { getAllMessages } from "../Redux/Message/Action";
//
import SockJS from "sockjs-client/dist/sockjs";
import { over } from "stompjs";
import { BASE_API_URL } from "../config/api";
//
export default function HomePage() {
  const [currentChat, setCurrentChat] = useState(null);
  const [sidbarNav, setSidbarNav] = useState("chats");

  const { auth, chat, message } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // sockkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
  const [stompClient, setStompClient] = useState();
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  function connect() {
    const sock = new SockJS("http://localhost:8080/ws");
    const temp = over(sock);
    setStompClient(temp);
    const headers = {
      Authorization: `Bearer ${token}`,
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
    };

    temp.connect(headers, onConnect, onError);
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  }
  function onError(error) {
    console.log("on error", error);
  }
  function onConnect() {
    setIsConnected(true);
    console.log("connect");
  }
  function onReceiveMessage(payload) {
    console.log("message received", JSON.parse(payload.body));
    const receivedMessage = JSON.parse(payload.body);
    setMessages([...messages, receivedMessage]);
  }
  useEffect(() => {
    if (isConnected && stompClient && auth.reqUser && currentChat) {
      const subscription = stompClient.subscribe(
        "/group/",
        currentChat.id.toString,
        onReceiveMessage,
      );

      return () => {
        subscription.unsubscribe();
      };
    }
  });

  useEffect(() => {
    if (message.newMessage && stompClient) {
      setMessages([...messages, message.newMessage]);
      stompClient?.send("/app/message", {}, JSON.stringify(message.newMessage));
    }
  }, [message.newMessage]);

  useEffect(() => {
    connect();
  }, []);

  useEffect(() => {
    setMessages(message.messages);
  }, [message.messages]);
  // sockkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk

  const handleClickOnChatCard = (item, userId) => {
    setCurrentChat(true);
    dispatch(createChat({ token, date: userId }));
  };

  //   const handleCreateNewMessage = () => {
  //     dispatch();
  //   };

  //   const handleCreateChat = (userId) => {
  //     //   dispatch(createChat(userId));
  //   };

  useEffect(() => {
    if (token && auth.reqUser?.id)
      dispatch(getUsersChat({ token, userId: auth.reqUser?.id }));
  }, [chat.createdGroup, chat.createdChat]);

  useEffect(() => {
    if (currentChat?.id)
      dispatch(getAllMessages({ chatId: currentChat.id, token }));
  }, [currentChat, message.newMessage]);

  useEffect(() => {
    if (token) dispatch(currentUser(token));
  }, [token]);

  useEffect(() => {
    if (!auth.reqUser?.fullName) {
      navigate("/signup");
    }
  }, [auth.reqUser]);

  function handleCurrentChat(item) {
    setCurrentChat(item);
  }
  // console.log("auth", auth.reqUser?.id);
  const token = localStorage.getItem("token");

  return (
    <>
      <div className=" relative h-screen w-screen  bg-slate-500 ">
        <div className="h-[15vh] bg-[#00a884] "></div>
        <div className="h-[85vh] bg-[#e8e9ec]"></div>
        <div className="absolute right-0 top-0 mx-[2.5vw] my-[2.5vh]  flex h-[95vh] w-[95vw] bg-[#f0f2f5]">
          {/* nav */}
          <div className="w-[30%] ">
            {sidbarNav == "profile" && <Profile setSidbarNav={setSidbarNav} />}
            {sidbarNav === "group" && (
              <CreateGroup setSidbarNav={setSidbarNav} />
            )}
            {sidbarNav == "chats" && (
              <Chats
                setSidbarNav={setSidbarNav}
                handleCurrentChat={handleCurrentChat}
                //     queries={queries}
                //     handleSearch={handleSearch}
                //     setQueries={setQueries}
                //     handleLogout={handleLogout}
                chatsArr={chat.chats}
              />
            )}
          </div>
          {/* main */}
          <div className="w-[70%] bg-green-700 ">
            {currentChat ? (
              <ChatSection currentChat={currentChat} />
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
