import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});
