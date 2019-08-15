"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const HttpStatus = tslib_1.__importStar(require("http-status-codes"));
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
            res.status(HttpStatus.NOT_FOUND).json(errors);
        });
    }
    get(req, res) {
        const errors = {};
        db_1.DB.Models.Profile.findOne({ user: req.payload.user })
            .then((profile) => {
            if (!profile) {
                errors.profile = "There is no profile for this user";
                return res.status(HttpStatus.NOT_FOUND).json(errors);
            }
            res.json(profile);
        })
            .catch((err) => {
            this.logger.err(err);
            res.status(HttpStatus.BAD_REQUEST).json(err);
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
                        res.status(HttpStatus.CONFLICT).json(errors);
                    }
                    else {
                        new db({
                            avatar,
                            githubrepo,
                            handle,
                            interests,
                            technologies,
                            user: userId
                        })
                            .save()
                            .then((profile) => res
                            .status(HttpStatus.CREATED)
                            .json(profile))
                            .catch((err) => {
                            res.json(err);
                        });
                    }
                })
                    .catch((err) => {
                    res.json(err);
                });
            }
            else {
                errors.profile = "User already has profile";
                res.status(HttpStatus.CONFLICT).json(errors);
            }
        })
            .catch((err) => {
            errors.db = "Could not connect to database";
            res.status(HttpStatus.BAD_REQUEST).json(errors);
        });
    }
    editProfile(req, res) {
        const errors = {};
        const { avatar, githubrepo } = req.body;
        let { interests, technologies } = req.body;
        const userId = req.payload.user;
        interests = interests !== undefined ? interests.split(",") : null;
        technologies =
            technologies !== undefined ? technologies.split(",") : null;
        const db = db_1.DB.Models.Profile;
        db.findOneAndUpdate({ user: userId }, { avatar, githubrepo, interests, technologies })
            .then((profile) => res.status(HttpStatus.ACCEPTED).json(profile))
            .catch((err) => {
            this.logger.err(err);
            res.json(err);
        });
    }
    deleteProfile(req, res) {
        const errors = {};
        const db = db_1.DB.Models.Profile;
        db.findOneAndRemove({ user: req.payload.user })
            .then(() => {
            db_1.DB.Models.User.findByIdAndRemove({ _id: req.payload.user })
                .then(() => res.json({ success: true }))
                .catch((err) => {
                this.logger.err(err);
                res.json(err);
            });
        })
            .catch((err) => {
            this.logger.err(err);
            res.json(err);
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
tslib_1.__decorate([
    core_1.Put(""),
    core_1.Middleware(jwt_1.JwtManager.middleware),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "editProfile", null);
tslib_1.__decorate([
    core_1.Delete(""),
    core_1.Middleware(jwt_1.JwtManager.middleware),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "deleteProfile", null);
ProfileController = tslib_1.__decorate([
    core_1.Controller("api/profile"),
    tslib_1.__metadata("design:paramtypes", [])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profileController.js.map