import axios from "axios";

import {
  USER_SIGN_UP,
  USER_SIGN_IN,
  GET_USER,
  LOG_OUT,
  AUTH_GOOGLE,
  USER_FAIL,
  TOGGLE,
} from "../Types";

export const signUp = (user, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:9000/auth/register",
      user
    );

    dispatch({ type: USER_SIGN_UP, payload: response.data });

    navigate("/");
  } catch (error) {
    dispatch({ type: USER_FAIL });
    console.log(error);
    error.response.data.errors.map((err) => alert(err.msg));
  }
};
export const getUser = () => async (dispatch) => {
  console.log('lanched')
  const config = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };
  try {
    const response = await axios.get(
      "http://localhost:9000/auth/current",
      config
    );
    dispatch({ type: GET_USER, payload: response.data });
  } catch (error) {
   dispatch({ type: USER_FAIL  });
    console.log(error);
    
    error.response.data.errors.map((err) => alert(err.msg));
  }
};
export const signIn = (user, navigate, confirm) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:9000/auth/login", user);
    dispatch({ type: USER_SIGN_IN, payload: response.data });

    if (confirm) {
      navigate("/post-car");
    } else {
      navigate("/");
    }
  } catch (error) {
    dispatch({ type: USER_FAIL });
    error.response.data.errors.map((err) => alert(err.msg));
  }
};
export const loginWithGoogle = (userData, navigate) => async (dispatch) => {
  try {
    dispatch({
      type: AUTH_GOOGLE,
      payload: { user: userData.profileObj, token: userData.tokenId },
    });
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
export const toggle = () => {
  return { type: TOGGLE };
};
export const logOut = (navigate) => (dispatch) => {
  dispatch({ type: LOG_OUT });
  navigate("/");
};
