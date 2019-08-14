import bodyParser from "body-parser";
import { Server } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";

import {
	RegisterController,
	LoginController,
	SecureController
} from "./controllers/";

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
		const registerController = new RegisterController();
		const loginController = new LoginController();
		const secureController = new SecureController();

		super.addControllers([
			registerController,
			loginController,
			secureController
		]);
	}

	public start(port: number) {
		this.app.listen(port, () => {
			this.logger.info(`Server started on port: ${port}`);
		});
	}
}
