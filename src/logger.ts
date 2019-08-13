import { format, createLogger, transports } from "winston";

const logger = createLogger({
    defaultMeta: { service: "face-bot-logger" },
    format: format.combine(
        format.errors({ stack: true }),
        format.json(),
        format.splat(),
        format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        })
    ),
    level: "info",
    transports: [
    // write all logs with level 'info' and below to 'face-bot-combined.log'
    // write all logs error(and below) to 'face-bot-error.log'
        new transports.File({ filename: "face-bot-error.log", level: "error" }),
        new transports.File({ filename: "face-bot-combined.log" })
    ]
});

// If not in production then ALSO log to the console with simple, colorized format
if (process.env.NODE_ENV !== "production") {
    logger.add(
        new transports.Console({
            format: format.combine(format.colorize(), format.simple())
        })
    );
}

export default logger;
