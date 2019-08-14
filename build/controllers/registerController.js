"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = require("@overnightjs/logger");
const db_1 = require("../db");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
let RegisterController = class RegisterController {
    constructor() {
        this.logger = new logger_1.Logger();
    }
    post(req, res) {
        const errors = {};
        const { email, password, password2 } = req.body;
        if (password !== password2) {
            errors.password2 = "Passwords must match";
            return res.status(http_status_codes_1.BAD_REQUEST).json(errors);
        }
        db_1.DB.Models.User.findOne({ email: email })
            .then((user) => {
            if (user) {
                errors.email =
                    "That email is already registered on this site.";
                return res.status(http_status_codes_1.BAD_REQUEST).json(errors);
            }
            bcryptjs_1.default
                .hash(password, 12)
                .then((hashedPassword) => {
                const newUser = new db_1.DB.Models.User({
                    email,
                    password: hashedPassword
                });
                newUser
                    .save()
                    .then((user) => {
                    res.status(http_status_codes_1.CREATED).json(user);
                })
                    .catch((err) => {
                    errors.db = err;
                    this.logger.err(new Error(errors.db));
                    res.status(http_status_codes_1.BAD_REQUEST).json(errors.db);
                });
            })
                .catch((err) => {
                errors.db = err;
                this.logger.err(new Error(errors.db));
                res.status(http_status_codes_1.BAD_REQUEST).json(errors.db);
            });
        })
            .catch((err) => {
            errors.db = err;
            this.logger.err(new Error(errors.db));
            res.status(http_status_codes_1.BAD_REQUEST).json(errors);
        });
    }
};
tslib_1.__decorate([
    core_1.Post("register"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RegisterController.prototype, "post", null);
RegisterController = tslib_1.__decorate([
    core_1.Controller("api/users"),
    tslib_1.__metadata("design:paramtypes", [])
], RegisterController);
exports.RegisterController = RegisterController;
//# sourceMappingURL=registerController.js.map