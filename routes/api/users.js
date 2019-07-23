const express = require("express");
const router = express.Router();

const authController = require("../../controllers/auth");

// @route   Get api/users/test
// @desc    Tests Users route
// @access  Public
router.get("/test", (req, res) => {
  res.send({ message: "Users Works" });
});

// @route   POST api/users/test
// @desc    Register new user
// @access  Public
router.post("/register", (req, res) => authController.registerUser(req, res));

// @route   GET api/users/login
// @desc    Login User / Return JWT
// @access  Public
router.get("/login", (req, res) => authController.loginUser(req, res));

module.exports = router;
