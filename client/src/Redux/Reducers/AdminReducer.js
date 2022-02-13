import { GET_ALL_USERS, GET_ALL_POSTS, LOADING } from "../Types";
const initState = { users: [], user: {}, posts: [], post: {}, isLaoding: true };
const AdminReducer = (state = initState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLaoding: true };
    case GET_ALL_USERS:
      return { ...state, users: action.payload, isLaoding: false };
    case GET_ALL_POSTS:
      return { ...state, posts: action.payload, isLaoding: false };
    default:
      return state;
  }
};
export default AdminReducer;
