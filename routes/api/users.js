const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../../controllers/auth");

// @route   Get api/users/test
// @desc    Tests Users route
// @access  Public
router.get("/test", (req, res) => {
  res.send({ message: "Users Works" });
});

// @route   POST api/users/test
// @desc    Register new user
// @access  Public
router.post("/register", registerUser);

// @route   POST api/users/login
// @desc    Login User / Return JWT
// @access  Public
router.post("/login", loginUser);

module.exports = router;
