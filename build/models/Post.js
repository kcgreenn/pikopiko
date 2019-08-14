"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: [
            {
                user: {
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: "users"
                }
            }
        ]
    },
    replies: [
        {
            createdAt: {
                type: Date,
                defaullt: Date.now
            },
            text: {
                type: String,
                required: true
            },
            user: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users"
    }
});
const Post = mongoose_1.default.model("Post", postSchema);
exports.default = Post;
//# sourceMappingURL=Post.js.map