import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_PROFILES
} from "./types";

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        //   retrun empty profile if not found
        type: GET_PROFILE,
        payload: {}
      });
    });
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    });
};

// Create Profile
export const editProfile = (profileData, history) => dispatch => {
  axios
    .put("/api/profile", profileData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    });
};

// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// Delete User Account
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? This cannot be undone.")) {
    axios
      .delete("/api/profile")
      .then(res => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response
        });
      });
  }
};

// Add Experience
export const addExp = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    });
};

// Delete Experience
export const deleteExperience = expId => dispatch => {
  axios
    .delete(`/api/profile/experience/${expId}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    });
};

// Add Education
export const addEdu = (eduData, history) => dispatch => {
  axios
    .post("/api/profile/education", eduData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    });
};

// Delete Education
export const deleteEducation = eduId => dispatch => {
  axios
    .delete(`/api/profile/education/${eduId}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    });
};

// Get all Profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    })
    .catch(errors => {
      dispatch({
        type: GET_PROFILES,
        payload: {}
      });
    });
};
