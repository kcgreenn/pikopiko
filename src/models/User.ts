import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
    createdAt: Date;
    email: string;
    name: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
