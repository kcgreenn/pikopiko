"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = require("@overnightjs/logger");
const mongo_1 = require("../mongo");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const jwt_1 = require("@overnightjs/jwt");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
let LoginController = class LoginController {
    constructor() {
        this.logger = new logger_1.Logger();
    }
    post(req, res) {
        const errors = {};
        const { email, password } = req.body;
        mongo_1.DB.Models.User.findOne({ email })
            .then((user) => {
            if (user === null) {
                errors.email = "User not found";
                res.status(http_status_codes_1.NOT_FOUND).json(errors);
            }
            else {
                bcryptjs_1.default
                    .compare(password, user.password)
                    .then((isMatch) => {
                    if (isMatch) {
                        const jwtStr = jwt_1.JwtManager.jwt({
                            user: user._id
                        });
                        return res.status(http_status_codes_1.OK).json({
                            jwt: jwtStr
                        });
                    }
                })
                    .catch((err) => {
                    errors.db = "Server error";
                    res.status(http_status_codes_1.BAD_REQUEST).json(errors);
                });
            }
        })
            .catch((err) => {
            errors.db = "Could not find user in database";
            res.status(http_status_codes_1.BAD_REQUEST).json(errors);
        });
    }
};
tslib_1.__decorate([
    core_1.Post("login"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], LoginController.prototype, "post", null);
LoginController = tslib_1.__decorate([
    core_1.Controller("api/users"),
    tslib_1.__metadata("design:paramtypes", [])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=loginController.js.map