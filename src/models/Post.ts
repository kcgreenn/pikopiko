import mongoose, { Schema } from "mongoose";

export interface ReplyI {
    [index: number]: {
        createdAt: Date;
        text: string;
        user: mongoose.Schema.Types.ObjectId;
    };
}
export interface LikeI {
    [index: number]: { user: mongoose.Schema.Types.ObjectId };
}

export interface PostI extends mongoose.Document {
    createdAt: Date;
    likes: LikeI;
    replies: ReplyI;
    text: string;
    user: mongoose.Schema.Types.ObjectId;
}

const postSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: [
            {
                user: {
                    type: Schema.Types.ObjectId,
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
                type: Schema.Types.ObjectId,
                ref: "users"
            }
        }
    ],
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
});

const Post = mongoose.model<PostI>("Post", postSchema);
export default Post;
