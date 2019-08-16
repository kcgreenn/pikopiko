"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const core_1 = require("@overnightjs/core");
const logger_1 = require("@overnightjs/logger");
const controllers_1 = require("./controllers/");
class MyServer extends core_1.Server {
    constructor() {
        super();
        this.logger = new logger_1.Logger();
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.setupControllers();
    }
    setupControllers() {
        const userController = new controllers_1.UserController();
        const profileController = new controllers_1.ProfileController();
        const postController = new controllers_1.PostController();
        super.addControllers([
            userController,
            profileController,
            postController
        ]);
    }
    start(port) {
        this.app.listen(port, () => {
            this.logger.info(`Server started on port: ${port}`);
        });
    }
}
exports.default = MyServer;
//# sourceMappingURL=server.js.map