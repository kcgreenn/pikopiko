import axios from "axios";

import {
  ADD_POST,
  GET_POSTS,
  DELETE_POST,
  POST_LOADING,
  GET_POST,
  GET_ERRORS,
  CLEAR_ERRORS
} from "./types";

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());
  axios
    .get("/api/posts")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(error => {
      dispatch({
        type: GET_POSTS,
        payload: {}
      });
    });
};

// Add Post
export const addPost = postData => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/posts", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    });
};

// Delete Post
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    });
};

// Like Post
export const likePost = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getPosts()))
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        payload: error.response
      });
    });
};

// Get Post
export const getPost = id => dispatch => {
  dispatch(setPostLoading());
  axios
    .get(`/api/posts/${id}`)
    .then(res => {
      dispatch({
        type: GET_POST,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_POST,
        payload: null
      });
    });
};

// Add Comment
export const addComment = (newComment, postId) => dispatch => {
  dispatch(clearErrors());
  dispatch(setPostLoading());
  axios
    .post(`/api/posts/comment/${postId}`, newComment)
    .then(res => {
      dispatch({
        type: GET_POST,
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

// Delete Comment
export const deleteComment = (postId, commentId, userId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`, userId)
    .then(res => {
      dispatch({
        type: GET_POST,
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

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
