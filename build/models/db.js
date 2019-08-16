"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const _1 = require("./");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const logger_1 = require("@overnightjs/logger");
dotenv_1.default.config();
class DB {
    constructor() {
        if (process.env.MONGO_URI !== undefined) {
            mongoose_1.connect(process.env.MONGO_URI, { useNewUrlParser: true, useFindAndModify: false });
        }
        this.logger = new logger_1.Logger();
        this._db = mongoose_1.connection;
        this._db.on("open", this.connected);
        this._db.on("error", this.error);
        this._models = {
            User: new _1.User().model,
            Post: new _1.Post().model,
            Profile: new _1.Profile().model
        };
    }
    static get Models() {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance._models;
    }
    connected() {
        DB.instance.logger.imp("Mongoose has connected");
    }
    error() {
        DB.instance.logger.err(this.error);
    }
}
exports.DB = DB;
//# sourceMappingURL=db.js.map