const express = require("express");

const router = express.Router();

// @route   Get api/users/test
// @desc    Tests Users route
// @access  Public
router.get("/test", (req, res) => {
  res.send({ message: "Users Works" });
});

module.exports = router;
