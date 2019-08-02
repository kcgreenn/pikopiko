import { combineReducers } from "redux";
import authReducer from "./authReducers";

export default combineReducers({
  auth: authReducer
});
