import axios from "axios";
import {
  GET_POSTS,
  POST_POST,
  UPDATE_POST,
  LIKE_POST,
  GET_ONE_POST,
  LOADING_POST,
} from "../Types";
export const getPosts = () => async (dispatch) => {
  dispatch({ type: LOADING_POST });
  try {
    const response = await axios.get("http://localhost:9000/post");
    dispatch({ type: GET_POSTS, payload: response.data });
  } catch (error) {
    console.log(error.message);
  }
};
export const postPost = (newPost) => async (dispatch) => {
  const config = {
    headers: {
      token: localStorage.getItem("token"),
    },
  };
  try {
    const response = await axios.post(
      "http://localhost:9000/post",
      newPost,
      config
    );
    dispatch(getPosts());
    dispatch({ type: POST_POST, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const response = await axios.put(`http://localhost:9000/post/${id}`, post);
    dispatch(GET_POSTS());
    dispatch({ type: UPDATE_POST, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
export const likePost = (id) => async (dispatch) => {
   dispatch({ type: LOADING_POST });
  try {
    const config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };

    const response = await axios.put(
      `http://localhost:9000/post/${id}/likePost`,
      {},
      config
    );
    dispatch(getPosts());
    dispatch({ type: LIKE_POST, payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
export const getOnePost = (id) => async (dispatch) => {
  dispatch({ type: LOADING_POST });
  try {
    const response = await axios.get(`http://localhost:9000/post/${id}`);

    dispatch({ type: GET_ONE_POST, payload: response.data.post });
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = (id) => async (dispatch) => {
  try {
    const config = {
      headers: {
        token: localStorage.getItem("token"),
      },
    };
    const response = await axios.delete(
      `http://localhost:9000/post/${id}`,
      config
    );
    dispatch(getPosts());
  } catch (error) {
    console.log(error);
  }
};
