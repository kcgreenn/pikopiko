import { LoggerModes } from "@overnightjs/logger";
import path from "path";
import fs from "fs";

// Set the log file path
const logFilePath = path.join(__dirname, "../picopico.log");
process.env.OVERNIGHT_LOGGER_MODE = LoggerModes.File;
process.env.OVERNIGHT_LOGGER_FILEPATH = logFilePath;

// Remove current log if it exists
(function removeLog() {
  try {
    fs.unlinkSync(logFilePath);
  } catch (e) {
    return;
  }
})();
