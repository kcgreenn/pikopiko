import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Register User / Redirect to Login
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => {
      // Redirect on successful registration
      history.push("/login");
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      });
    });
};

// Login / Get User Token
export const loginUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save Auth Token in LocalStorage and Redirect
      const { token } = res.data;
      //   Set local storage
      localStorage.setItem("jwtToken", token);
      //   Set Token to Auth Header
      setAuthToken(token);
      //   Decode token to get user data
      const decoded = jwt_decode(token);
      //   set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    });
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // remove token from local Storage
  localStorage.removeItem("jwtToken");
  //   Remove auth header for future requests
  setAuthToken(false);
  //   Set current uaer to {} and isAuthenticated to false
  dispatch(setCurrentUser({}));
};
