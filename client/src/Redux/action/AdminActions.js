import { GET_ALL_USERS, GET_ALL_POSTS, LOADING } from "../Types";
import axios from "axios";
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    const response = await axios.get(
      "http://localhost:9000/admin/user",
      config
    );
    dispatch({ type: GET_ALL_USERS, payload: response.data.users });
  } catch (error) {
    alert(error);
  }
};
export const getAllPosts = () => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    const response = await axios.get(
      "http://localhost:9000/admin/post",
      config
    );
    dispatch({ type: GET_ALL_POSTS, payload: response.data.posts });
  } catch (error) {
    alert(error);
  }
};
export const deleteUser = (id) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    const response = await axios.delete(
      `http://localhost:9000/admin/user/${id}`,
      config
    );
    dispatch(getAllUsers());
  } catch (error) {
    console.log(error);
  }
};
export const deletePostFromAdmin = (id) => async (dispatch) => {
  dispatch({ type: LOADING });
  try {
    const config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    const response = await axios.delete(
      `http://localhost:9000/admin/post/${id}`,
      config
    );
    dispatch(getAllPosts());
  } catch (error) {
    console.log(error);
  }
};
