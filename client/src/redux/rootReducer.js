import { combineReducers } from "redux";
import alertReducer from "./alert/alertReducer";
import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  alerts: alertReducer,
  auth: authReducer,
});

export default rootReducer;
