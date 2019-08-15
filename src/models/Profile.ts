import { Schema, model, Document, Model } from "mongoose";

// username, interests, githubrepo, avatar, createdAt, technologies
interface IInterests {
	[index: number]: { text: string };
}
interface ITechnologies {
	[index: number]: { text: string };
}
interface IFollowing {
	[index: number]: { user: string };
}

export interface IProfile extends Document {
	avatar: string;
	createdAt: Date;
	following: [IFollowing];
	githubrepo: string;
	handle: string;
	interests: [IInterests];
	technologies: [ITechnologies];
	user: string;
}

export interface ProfileModel extends Model<IProfile> {}

export class Profile {
	private _model: Model<IProfile>;

	constructor() {
		const schema = new Schema({
			avatar: { type: String },
			createdAt: { type: Date, default: Date.now },
			following: { type: Array },
			githubrepo: { type: String },
			handle: { type: String },
			interests: { type: Array },
			technologies: { type: Array },
			user: { type: Schema.Types.ObjectId, ref: "users" }
		});

		this._model = model<IProfile>("Profile", schema);
	}

	public get model(): Model<IProfile> {
		return this._model;
	}
}
