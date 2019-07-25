const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

// import controllers
const {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  likePost
} = require("../../controllers/posts");

const {
  addCommenttoPost,
  deleteComment
} = require("../../controllers/comments");

// @route   Get api/posts/test
// @desc    Tests Posts route
// @access  Public
router.get("/test", (req, res) => {
  res.send({ message: "Posts Works" });
});

// @route   GET api/posts/
// @desc    Return all posts
// @access  Public
router.get("/", getAllPosts);

// @route   GET api/posts/:id
// @desc    Return Post with given Id
// @access  Public
router.get("/:id", getPostById);

// @route   POST api/posts/
// @desc    Create a new post
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), createPost);

// @route   Delete api/posts/:id
// @desc    Delete a Post with given Id
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deletePost
);

// @route   POST api/posts/like/:id
// @desc    Like or unlike a post of given id
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  likePost
);

// @route   POST api/posts/comment/:id
// @desc    Add a comment to a post of given id
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  addCommenttoPost
);

// @route   DELETE api/posts/comment/:id/comment_id
// @desc    Delete a comment of given id
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  deleteComment
);

module.exports = router;
