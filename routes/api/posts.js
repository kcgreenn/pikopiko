const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const passport = require("passport");

// import controllers
const { createPost } = require("../../controllers/posts");

// @route   Get api/posts/test
// @desc    Tests Posts route
// @access  Public
router.get("/test", (req, res) => {
  res.send({ message: "Posts Works" });
});

// @route   POST api/posts/
// @desc    Create a new post
// @access  Private
router.post("/", passport.authenticate("jwt", { session: false }), createPost);

module.exports = router;
