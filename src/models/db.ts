import { connect, connection, Connection } from "mongoose";
import { User, UserModel, Post, PostModel, Profile, ProfileModel } from "./";
import dotenv from "dotenv";
import { Logger } from "@overnightjs/logger";
import { IReply } from "./Post";
dotenv.config();

export interface IModels {
	User: UserModel;
	Post: PostModel;
	Profile: ProfileModel;
}

export class DB {
	private static instance: DB;
	private readonly logger: Logger;

	private _db: Connection;
	private _models: IModels;

	private constructor() {
		if (process.env.MONGO_URI !== undefined) {
			connect(
				process.env.MONGO_URI,
				{ useNewUrlParser: true, useFindAndModify: false }
			);
		}

		this.logger = new Logger();

		this._db = connection;
		this._db.on("open", this.connected);
		this._db.on("error", this.error);

		this._models = {
			// initialize all models
			User: new User().model,
			Post: new Post().model,
			Profile: new Profile().model
		};
	}

	public static get Models() {
		if (!DB.instance) {
			DB.instance = new DB();
		}
		return DB.instance._models;
	}
	private connected() {
		DB.instance.logger.info("Mongoose has connected");
	}
	private error() {
		DB.instance.logger.err(this.error);
	}
}
