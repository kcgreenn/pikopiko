import { Schema, model, Document, Model } from "mongoose";

export interface IReply {
	createdAt?: Date;
	id?: string;
	text: string;
	userName: string;
	user: string;
}
export interface ILike {
	userId: string;
}

export interface IPost extends Document {
	replies: Array<IReply>;
	createdAt: Date;
	likes: Array<ILike>;
	text: string;
	user: string;
	userName: string;
}

// extends mongoose Model to use properties
export interface PostModel extends Model<IPost> {}

export class Post {
	private _model: Model<IPost>;

	constructor() {
		const schema = new Schema({
			replies: [
				{
					createdAt: { type: Date, default: Date.now },
					text: { type: String, required: true },
					user: { type: Schema.Types.ObjectId, ref: "users" },
					userName: { type: String, required: true }
				}
			],
			createdAt: { type: Date, default: Date.now },
			likes: [
				{
					user: {
						type: Schema.Types.ObjectId,
						ref: "users"
					}
				}
			],
			text: { type: String, required: true },
			user: { type: Schema.Types.ObjectId, ref: "users" },
			userName: { type: String, required: true }
		});

		this._model = model<IPost>("Post", schema);
	}

	public get model(): Model<IPost> {
		return this._model;
	}
}
