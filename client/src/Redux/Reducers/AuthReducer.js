import {
  USER_SIGN_UP,
  USER_FAIL,
  GET_USER,
  USER_SIGN_IN,
  LOG_OUT,
  AUTH_GOOGLE,
  TOGGLE
} from "../Types";
const iniState = { user: null, loading: true, isAuth: false, errors: [],confirm:false };

const AuthReducer = (state = iniState, action) => {
  switch (action.type) {
    case USER_SIGN_UP:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,  
        loading: false,
        isAuth: true,
      };
      case TOGGLE:
        return {...state,confirm:true}
    case GET_USER:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        isAuth: true,
      };
    case USER_SIGN_IN:
      console.log(action.payload.user)
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        loading: false,
        isAuth: true,
        confirm:false
      };
    case LOG_OUT:
    case USER_FAIL:
      localStorage.clear()
      /* localStorage.removeItem("token"); */
      return { ...state, user: null, isAuth: false, errors: action.payload };
    case AUTH_GOOGLE:
      case USER_SIGN_IN:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      return {
        ...state,
        user: action.payload.user,
        lodaing: false,
        isAuth: true,
      };
    default:
      return state;
  }
};
export default AuthReducer;
