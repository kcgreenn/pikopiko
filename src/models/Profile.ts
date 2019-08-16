import { Schema, model, Document, Model } from "mongoose";

// username, interests, githubrepo, avatar, createdAt, technologies
interface IInterests {
	[index: number]: { text: string };
}
interface IFollowing {
	[index: number]: { user: string };
}

export interface IProfile extends Document {
	avatar?: string;
	bio?: string;
	createdAt: Date;
	following?: [IFollowing];
	interests?: [IInterests];
	user: string;
}

export interface ProfileModel extends Model<IProfile> {}

export class Profile {
	private _model: Model<IProfile>;

	constructor() {
		const schema = new Schema({
			avatar: { type: String },
			bio: { type: String },
			createdAt: { type: Date, default: Date.now },
			following: [
				{
					type: Schema.Types.ObjectId,
					ref: "users"
				}
			],
			interests: [
				{
					type: String
				}
			],
			user: { type: Schema.Types.ObjectId, ref: "users" }
		});

		this._model = model<IProfile>("Profile", schema);
	}

	public get model(): Model<IProfile> {
		return this._model;
	}
}
