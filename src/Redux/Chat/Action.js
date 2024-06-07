import { BASE_API_URL } from "../../config/api";
import { CREATE_CHAT, CREATE_GROUP, GET_USERS_CHAT } from "./ActionType";

export const createChat = (chatData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/chats/single`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `  ${chatData.token} `,
      },
      body: JSON.stringify(chatData.data),
    });

    const data = await res.json();
    console.log(data);
    dispatch({ type: CREATE_CHAT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createGroupChat = (chatData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/chats/group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `  ${chatData.token} `,
      },
      body: JSON.stringify(chatData.group),
    });

    const data = await res.json();
    console.log(data);
    dispatch({ type: CREATE_GROUP, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUsersChat = (chatData) => async (dispatch) => {
  console.log("getUsersChat", chatData);

  try {
    const res = await fetch(
      `${BASE_API_URL}/api/chats/by-user?userId=${chatData.userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${chatData.token} `,
        },
      },
    );

    const data = await res.json();
    console.log("getUsersChatRes", data);
    dispatch({ type: GET_USERS_CHAT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
