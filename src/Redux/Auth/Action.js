import { BASE_API_URL } from "../../config/api";
import {
  REGISTER,
  LOGIN,
  REQ_USER,
  SEARCH_USER,
  UPDATE_USER,
  LOGOUT,
} from "./ActionType";

export const register = (data) => async (dispatch) => {
  try {
    console.log(data);
    const res = await fetch(`${BASE_API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();

    if (resData.jwt) {
      localStorage.setItem("token", resData.jwt);
    }

    console.log("register", resData);
    dispatch({ type: REGISTER, payload: resData });
  } catch (error) {
    console.log(error);
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();

    if (resData.jwt) {
      localStorage.setItem("token", resData.jwt);
    }

    console.log("login", resData);
    dispatch({ type: LOGIN, payload: resData });
  } catch (error) {
    console.log(error);
  }
};

export const currentUser = (token) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resData = await res.json();
    console.log("register", resData);
    dispatch({ type: REQ_USER, payload: resData });
  } catch (error) {
    console.log(error);
  }
};

export const searchUser = (data) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_API_URL}/users/search?name=${data.keyWord}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      },
    );
    const resData = await res.json();
    console.log("register", resData);
    dispatch({ type: SEARCH_USER, payload: resData });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/users/update${data.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    });
    const resData = await res.json();
    console.log("update", resData);
    dispatch({ type: UPDATE_USER, payload: resData });
  } catch (error) {
    console.log(error);
  }
};

export const logoutAction = () => async (dispatch) => {
  console.log("logout");
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT, payload: null });
  dispatch({ type: REQ_USER, payload: null });
};
