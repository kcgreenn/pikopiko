"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const HttpStatus = tslib_1.__importStar(require("http-status-codes"));
const logger_1 = require("@overnightjs/logger");
const bcryptjs_1 = tslib_1.__importDefault(require("bcryptjs"));
const jwt_1 = require("@overnightjs/jwt");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const start_1 = tslib_1.__importDefault(require("../start"));
let UserController = class UserController {
    constructor() {
        this.logger = new logger_1.Logger();
    }
    login(req, res) {
        const errors = {};
        const { email, password } = req.body;
        start_1.default.User.findOne({ email })
            .then((user) => {
            if (user === null) {
                errors.email = "User not found";
                res.status(HttpStatus.NOT_FOUND).json(errors);
            }
            else {
                bcryptjs_1.default
                    .compare(password, user.password)
                    .then((isMatch) => {
                    if (isMatch) {
                        const jwtStr = jwt_1.JwtManager.jwt({
                            userName: user.username,
                            userId: user._id
                        });
                        return res.status(HttpStatus.OK).json({
                            jwt: jwtStr
                        });
                    }
                })
                    .catch((err) => {
                    errors.db = "Server error";
                    res.status(HttpStatus.BAD_REQUEST).json(errors);
                });
            }
        })
            .catch((err) => {
            errors.db = "Could not find user in database";
            res.status(HttpStatus.BAD_REQUEST).json(errors);
        });
    }
    register(req, res) {
        const errors = {};
        const { email, password, password2, username } = req.body;
        if (password !== password2) {
            errors.password2 = "Passwords must match";
            return res.status(HttpStatus.BAD_REQUEST).json(errors);
        }
        start_1.default.User.findOne({ email: email })
            .then((user) => {
            if (user) {
                errors.email =
                    "That email is already registered on this site.";
                return res.status(HttpStatus.BAD_REQUEST).json(errors);
            }
            start_1.default.User.findOne({ username: username })
                .then((user) => {
                if (user) {
                    errors.username = "That username is already taken";
                    return res
                        .status(HttpStatus.BAD_REQUEST)
                        .json(errors);
                }
                bcryptjs_1.default
                    .hash(password, 12)
                    .then((hashedPassword) => {
                    const newUser = new start_1.default.User({
                        email,
                        password: hashedPassword,
                        username
                    });
                    newUser
                        .save()
                        .then((user) => {
                        res.status(HttpStatus.CREATED).json(user);
                    })
                        .catch((err) => {
                        errors.db = err;
                        this.logger.err(new Error(errors.db));
                        res.status(HttpStatus.BAD_REQUEST).json(errors.db);
                    });
                })
                    .catch((err) => {
                    errors.db = err;
                    this.logger.err(new Error(errors.db));
                    res.status(HttpStatus.BAD_REQUEST).json(errors.db);
                });
            })
                .catch((err) => {
                errors.db = "Could not complete request";
                this.logger.err(errors);
                res.status(HttpStatus.BAD_REQUEST).json(errors);
            });
        })
            .catch((err) => {
            errors.db = err;
            this.logger.err(new Error(errors.db));
            res.status(HttpStatus.BAD_REQUEST).json(errors);
        });
    }
};
tslib_1.__decorate([
    core_1.Post("login"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    core_1.Post("register"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], UserController.prototype, "register", null);
UserController = tslib_1.__decorate([
    core_1.Controller("api/users"),
    tslib_1.__metadata("design:paramtypes", [])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=userController.js.map