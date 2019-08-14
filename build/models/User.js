"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class User {
    constructor() {
        const schema = new mongoose_1.Schema({
            createdAt: { type: Date, default: Date.now },
            email: { type: String, required: true },
            password: { type: String, required: true }
        });
        this._model = mongoose_1.model("User", schema);
    }
    get model() {
        return this._model;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map