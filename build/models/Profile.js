"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Profile {
    constructor() {
        const schema = new mongoose_1.Schema({
            avatar: { type: String },
            createdAt: { type: Date, default: Date.now },
            githubrepo: { type: String },
            handle: { type: String },
            interests: { type: String },
            technologies: { type: String },
            user: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" }
        });
        this._model = mongoose_1.model("Profile", schema);
    }
    get model() {
        return this._model;
    }
}
exports.Profile = Profile;
//# sourceMappingURL=Profile.js.map