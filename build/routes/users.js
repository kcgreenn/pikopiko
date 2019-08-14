"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
const loginController_1 = require("../controllers/loginController");
router.get("/test", (req, res) => {
    res.send({ message: "Users works" });
});
router.post("/register", loginController_1.registerUser);
exports.default = router;
//# sourceMappingURL=users.js.map