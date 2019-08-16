import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import { Server } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";
import path from "path";

import {
	UserController,
	ProfileController,
	PostController
} from "./controllers/";
import { User } from "./models";

export default class MyServer extends Server {
	private readonly logger: Logger;

	constructor() {
		super();

		this.logger = new Logger();

		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));

		this.setupControllers();
	}
	private setupControllers(): void {
		const userController = new UserController();
		const profileController = new ProfileController();
		const postController = new PostController();

		super.addControllers([
			userController,
			profileController,
			postController
		]);
	}

	public start(port: number) {
		// Serve static assets if in production
		if (process.env.NODE_ENV === "production") {
			this.app.use(express.static("client/build"));

			this.app.get("*", (req: Request, res: Response) => {
				res.sendFile(
					path.resolve(__dirname, "client", "build", "index.html")
				);
			});
		}
		this.app.listen(port, () => {
			this.logger.imp(`Server started on port: ${port}`);
		});
	}
}
