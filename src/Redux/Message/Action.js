import { BASE_API_URL } from "../../config/api";
import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType";

export const createMessage = (messageData) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/messages/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `  ${messageData.token} `,
      },
      body: JSON.stringify(messageData.data),
    });

    const data = await res.json();
    dispatch({ type: CREATE_NEW_MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getAllMessages = (reqData) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_API_URL}/api/messages/chat/${reqData.chatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `  ${reqData.token} `,
        },
      },
    );

    const data = await res.json();
    dispatch({ type: GET_ALL_MESSAGE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
