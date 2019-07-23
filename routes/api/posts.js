const express = require("express");

const router = express.Router();

// @route   Get api/posts/test
// @desc    Tests Posts route
// @access  Public
router.get("/test", (req, res) => {
  res.send({ message: "Posts Works" });
});

module.exports = router;
