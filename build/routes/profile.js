"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get("/test", (req, res) => {
    res.send({ message: "Profile works" });
});
exports.default = router;
//# sourceMappingURL=profile.js.map