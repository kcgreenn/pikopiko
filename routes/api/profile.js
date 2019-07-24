const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getProfile,
  createProfile,
  editProfile
} = require("../../controllers/profile");

// @route   GET api/profile/test
// @desc    Tests Profile route
// @access  Public
router.get("/test", (req, res) => {
  res.send({ message: "Profile Works" });
});

// @route   GET api/profile
// @desc    Returns profile of current user
// @access  Private
router.get("/", passport.authenticate("jwt", { session: false }), getProfile);

// @route   POST api/profile
// @desc    Create user's profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createProfile
);

// @route   PUT api/profile
// @desc    Edit user's profile
// @access  Private
router.put("/", passport.authenticate("jwt", { session: false }), editProfile);

module.exports = router;
