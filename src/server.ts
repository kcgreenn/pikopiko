import bodyParser from "body-parser";
import { Server } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";

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
		this.app.listen(port, () => {
			this.logger.info(`Server started on port: ${port}`);
		});
	}
}
