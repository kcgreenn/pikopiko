"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_1 = tslib_1.__importDefault(require("fs"));
const logFilePath = path_1.default.join(__dirname, "../picopico.log");
process.env.OVERNIGHT_LOGGER_MODE = "FILE";
process.env.OVERNIGHT_LOGGER_FILEPATH = logFilePath;
(function removeLog() {
    try {
        fs_1.default.unlinkSync(logFilePath);
    }
    catch (e) {
        return;
    }
})();
//# sourceMappingURL=logger.js.map