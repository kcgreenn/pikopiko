"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var logger_1 = __importDefault(require("./logger"));
var app = express_1.default();
var users_1 = __importDefault(require("./routes/users"));
app.get("/", function (req, res) {
    res.send("Hello World");
});
app.use("/api/users", users_1.default);
var port = process.env.PORT || 5000;
app.listen(port, function () {
    logger_1.default.log({
        level: "info",
        message: "Server started on port: " + port
    });
});
