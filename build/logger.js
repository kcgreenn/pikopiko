"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var logger = winston_1.createLogger({
    defaultMeta: { service: "face-bot-logger" },
    format: winston_1.format.combine(winston_1.format.errors({ stack: true }), winston_1.format.json(), winston_1.format.splat(), winston_1.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
    })),
    level: "info",
    transports: [
        // write all logs with level 'info' and below to 'face-bot-combined.log'
        // write all logs error(and below) to 'face-bot-error.log'
        new winston_1.transports.File({ filename: "face-bot-error.log", level: "error" }),
        new winston_1.transports.File({ filename: "face-bot-combined.log" })
    ]
});
// If not in production then ALSO log to the console with simple, colorized format
if (process.env.NODE_ENV !== "production") {
    logger.add(new winston_1.transports.Console({
        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple())
    }));
}
exports.default = logger;
