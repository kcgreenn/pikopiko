const express = require("express");
const router = express.Router();
const passport = require("passport");

const { getProfile } = require("../../controllers/profile");

// @route   Get api/profile/test
// @desc    Tests Profile route
// @access  Public
router.get("/test", (req, res) => {
  res.send({ message: "Profile Works" });
});

// @route   Get api/profile
// @desc    Returns profile of current user
// @access  Private
router.get("/", passport.authenticate("jwt", { session: false }), getProfile);

module.exports = router;
