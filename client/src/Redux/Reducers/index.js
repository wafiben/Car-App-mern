import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import PostReducer from "./PostReducer";
import AdminReducer from "./AdminReducer";
const rootReducer = combineReducers({
  AuthReducer: AuthReducer,
  PostReducer: PostReducer,
  AdminReducer:AdminReducer
});
export default rootReducer;
