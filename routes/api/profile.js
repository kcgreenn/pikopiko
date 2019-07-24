const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getAllProfiles,
  getProfileByUserId,
  getProfileByHandle,
  getProfile,
  createProfile,
  editProfile
} = require("../../controllers/profile");

const { addExperience } = require("../../controllers/experience");
const { addEducation } = require("../../controllers/education");

// @route   GET api/profile/test
// @desc    Tests Profile route
// @access  Public
router.get("/test", (req, res) => {
  res.send({ message: "Profile Works" });
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", getAllProfiles);

// @route   GET api/profile/user/:userId
// @desc    Get user profile by userId
// @access  Public
router.get("/user/:userId", getProfileByUserId);

// @route   GET api/profile/handle/:handle
// @desc    Get user profile by handle
// @access  Public
router.get("/handle/:handle", getProfileByHandle);

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

// @route POST api/profile/experience
// @desc  Add expreience to profile
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  addExperience
);

// @route POST api/profile/education
// @desc  Add education to profile
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  addEducation
);

module.exports = router;
