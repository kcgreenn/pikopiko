import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  errors: errorReducer
});
