const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  getAllProfiles,
  getProfile,
  getProfileByHandle,
  getProfileByUserId
} = require("../../controllers/getProfile");
const {
  createProfile,
  editProfile,
  deleteProfile
} = require("../../controllers/editProfile");

const {
  addExperience,
  deleteExperience
} = require("../../controllers/experience");
const {
  addEducation,
  deleteEducation
} = require("../../controllers/education");

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

// @route DELETE api/profile/experience/:expId
// @desc  Delete experience
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  deleteExperience
);

// @route DELETE api/profile/education/:eduId
// @desc  Delete education
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  deleteEducation
);

// @route DELETE api/profile/
// @desc  Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  deleteProfile
);

module.exports = router;
