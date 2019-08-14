"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Post {
    constructor() {
        const schema = new mongoose_1.Schema({
            comments: [
                {
                    createdAt: { type: Date, default: Date.now },
                    test: { type: String, required: true },
                    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" }
                }
            ],
            createdAt: { type: Date, default: Date.now },
            likes: [
                {
                    user: {
                        type: mongoose_1.Schema.Types.ObjectId,
                        ref: "users"
                    }
                }
            ],
            text: { type: String, required: true },
            user: { type: mongoose_1.Schema.Types.ObjectId, ref: "users" }
        });
        this._model = mongoose_1.model("Post", schema);
    }
    get model() {
        return this._model;
    }
}
exports.Post = Post;
//# sourceMappingURL=Post.js.map