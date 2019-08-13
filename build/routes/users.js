"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", function (req, res) {
    res.send({ message: "Users works" });
});
exports.default = router;
