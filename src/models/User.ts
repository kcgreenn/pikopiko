import { Schema, model, Document, Model } from "mongoose";

// Declare what User document should look like
export interface IUser extends Document {
	createdAt: Date;
	email: string;
	name: string;
	password: string;
}

// Extend the mongoose.Model so it can use properties
export interface UserModel extends Model<IUser> {}

export class User {
	private _model: Model<IUser>;

	constructor() {
		const schema = new Schema({
			createdAt: { type: Date, default: Date.now },
			email: { type: String, required: true },
			name: { type: String, maxlength: 24, minlength: 4, required: true },
			password: { type: String, required: true }
		});

		this._model = model<IUser>("User", schema);
	}

	public get model(): Model<IUser> {
		return this._model;
	}
}
