import { combineReducers } from "redux";
import alertReducer from "./alert/alertReducer";

const rootReducer = combineReducers({
  alerts: alertReducer,
});

export default rootReducer;
