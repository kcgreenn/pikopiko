const express = require("express");

const router = express.Router();

// @route   Get api/profile/test
// @desc    Tests Profile route
// @access  Public
router.get("/test", (req, res) => {
  res.send({ message: "Profile Works" });
});

module.exports = router;
