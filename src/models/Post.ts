import { Schema, model, Document, Model } from "mongoose";

interface IComment {
	[index: number]: { createdAt: Date; text: string; userName: string };
}
interface ILike {
	[index: number]: { user: string };
}

export interface IPost extends Document {
	comments: [];
	createdAt: Date;
	likes: string[];
	text: string;
	user: string;
}

// extends mongoose Model to use properties
export interface PostModel extends Model<IPost> {}

export class Post {
	private _model: Model<IPost>;

	constructor() {
		const schema = new Schema({
			comments: [
				{
					createdAt: { type: Date, default: Date.now },
					test: { type: String, required: true },
					user: { type: Schema.Types.ObjectId, ref: "users" }
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
			user: { type: Schema.Types.ObjectId, ref: "users" }
		});

		this._model = model<IPost>("Post", schema);
	}

	public get model(): Model<IPost> {
		return this._model;
	}
}
