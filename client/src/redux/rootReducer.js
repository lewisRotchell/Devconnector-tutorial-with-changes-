import { combineReducers } from "redux";
import alertReducer from "./alert/alertReducer";
import authReducer from "./auth/authReducer";
import profileReducer from "./profile/profileReducer";
import postReducer from "./post/postReducer";

const rootReducer = combineReducers({
  alerts: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  post: postReducer,
});

export default rootReducer;
