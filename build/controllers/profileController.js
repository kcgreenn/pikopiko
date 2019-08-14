"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const http_status_codes_1 = require("http-status-codes");
const logger_1 = require("@overnightjs/logger");
const jwt_1 = require("@overnightjs/jwt");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("../db");
let ProfileController = class ProfileController {
    constructor() {
        this.logger = new logger_1.Logger();
    }
    getById(req, res) {
        const errors = {};
        db_1.DB.Models.Profile.findOne(req.params.userId)
            .then((profile) => {
            if (profile) {
                res.json(profile);
            }
        })
            .catch((err) => {
            this.logger.err(err);
            errors.profile = "User does not have a profile";
            res.status(http_status_codes_1.NOT_FOUND).json(errors);
        });
    }
    get(req, res) {
        const errors = {};
        db_1.DB.Models.Profile.findOne({ user: req.payload.user })
            .then((profile) => {
            if (!profile) {
                errors.profile = "There is no profile for this user";
                return res.status(http_status_codes_1.NOT_FOUND).json(errors);
            }
            res.json(profile);
        })
            .catch((err) => {
            this.logger.err(err);
            res.status(http_status_codes_1.BAD_REQUEST).json(err);
        });
    }
    createProfile(req, res) {
        const errors = {};
        const { avatar, githubrepo, handle } = req.body;
        let { interests, technologies } = req.body;
        const userId = req.payload.user;
        interests = interests !== undefined ? interests.split(",") : null;
        technologies =
            technologies !== undefined ? technologies.split(",") : null;
        const db = db_1.DB.Models.Profile;
        db.findOne({ userId })
            .then((profile) => {
            if (!profile) {
                db.findOne({ handle })
                    .then((profile) => {
                    if (profile) {
                        errors.handle = "That handle is already in use";
                        res.status(http_status_codes_1.CONFLICT).json(errors);
                    }
                    else {
                        new db({
                            avatar,
                            githubrepo,
                            handle,
                            interests,
                            technologies
                        })
                            .save()
                            .then((profile) => res.status(http_status_codes_1.CREATED).json(profile))
                            .catch((err) => {
                            errors.db = "Could not create profile";
                            res.status(http_status_codes_1.BAD_REQUEST).json(errors);
                        });
                    }
                })
                    .catch((err) => {
                    errors.db = "Error connecting to database";
                    res.status(http_status_codes_1.BAD_REQUEST).json(errors);
                });
            }
            else {
                errors.profile = "User already has profile";
                res.status(http_status_codes_1.CONFLICT).json(errors);
            }
        })
            .catch((err) => {
            errors.db = "Could not connect to database";
            res.status(http_status_codes_1.BAD_REQUEST).json(errors);
        });
    }
};
tslib_1.__decorate([
    core_1.Get(":userId"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "getById", null);
tslib_1.__decorate([
    core_1.Get(""),
    core_1.Middleware(jwt_1.JwtManager.middleware),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "get", null);
tslib_1.__decorate([
    core_1.Post(""),
    core_1.Middleware(jwt_1.JwtManager.middleware),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "createProfile", null);
ProfileController = tslib_1.__decorate([
    core_1.Controller("api/profile"),
    tslib_1.__metadata("design:paramtypes", [])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profileController.js.map