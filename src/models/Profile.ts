import { Schema, model, Document, Model } from "mongoose";

// username, interests, githubrepo, avatar, createdAt, technologies

export interface IProfile extends Document {
	avatar: string;
	createdAt: Date;
	githubrepo: string;
	interests: string;
	technologies: string;
	user: string;
}

export interface ProfileModel extends Model<IProfile> {}

export class Profile {
	private _model: Model<IProfile>;

	constructor() {
		const schema = new Schema({
			avatar: { type: String },
			createdAt: { type: Date, default: Date.now },
			githubrepo: { type: String },
			interests: { type: String },
			technologies: { type: String },
			user: { type: Schema.Types.ObjectId, ref: "users" }
		});

		this._model = model<IProfile>("Profile", schema);
	}

	public get model(): Model<IProfile> {
		return this._model;
	}
}
