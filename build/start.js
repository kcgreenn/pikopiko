"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const server_1 = tslib_1.__importDefault(require("./server"));
const db_1 = require("./models/db");
const port = process.env.PORT !== undefined ? +process.env.PORT : 5000;
const db = db_1.DB.Models;
if (process.argv[2] !== "test") {
    let server = new server_1.default();
    server.start(port);
}
exports.default = db;
//# sourceMappingURL=start.js.map