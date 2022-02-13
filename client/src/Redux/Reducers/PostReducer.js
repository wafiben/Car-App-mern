import {
  GET_POSTS,
  POST_POST,
  UPDATE_POST,
  LIKE_POST,
  GET_ONE_POST,
  LOADING_POST,
} from "../Types";
const initState = {
  posts: [],
  post: {},
  isLoading: true,
};
const PostReducer = (state = initState, action) => {
  switch (action.type) {
    case LOADING_POST:
      return { ...state, isLoading: true };
    case GET_POSTS:
      return { ...state, posts: action.payload, isLoading: false };
    case POST_POST:
      return { ...state, post: action.payload };
    case UPDATE_POST:
      return { ...state, post: action.payload };
    case LIKE_POST:
      return { ...state, post: action.payload };
    case GET_ONE_POST:
      return { ...state, post: action.payload, isLoading: false };
    default:
      return state;
  }
};
export default PostReducer;
