"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const HttpStatus = tslib_1.__importStar(require("http-status-codes"));
const logger_1 = require("@overnightjs/logger");
const jwt_1 = require("@overnightjs/jwt");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const start_1 = tslib_1.__importDefault(require("../start"));
let ProfileController = class ProfileController {
    constructor() {
        this.logger = new logger_1.Logger();
    }
    getProfileByUsername(req, res) {
        const errors = {};
        start_1.default.Profile.findOne({ user: req.params.userId })
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
    getProfile(req, res) {
        const errors = {};
        start_1.default.Profile.findOne({ user: req.payload.userId })
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
        const { avatar, bio } = req.body;
        let { following, interests } = req.body;
        const userId = req.payload.userId;
        interests = interests !== undefined ? interests.split(",") : null;
        following = following !== undefined ? following.split(",") : null;
        start_1.default.Profile.findOne({ userId })
            .then((profile) => {
            if (!profile) {
                new start_1.default.Profile({
                    avatar,
                    bio,
                    interests,
                    user: userId
                })
                    .save()
                    .then((profile) => res.status(HttpStatus.CREATED).json(profile))
                    .catch((err) => {
                    res.json(err);
                });
            }
        })
            .catch((err) => {
            errors.db = "Could not complete request";
            this.logger.err(errors);
            res.status(HttpStatus.BAD_REQUEST).json(errors);
        });
    }
    editProfile(req, res) {
        const errors = {};
        const { avatar, bio } = req.body;
        let { interests } = req.body;
        const userId = req.payload.userId;
        interests = interests !== undefined ? interests.split(",") : null;
        start_1.default.Profile.findOneAndUpdate({ user: userId }, { avatar, bio, interests }, {
            new: true
        })
            .then((profile) => res.status(HttpStatus.ACCEPTED).json(profile))
            .catch((err) => {
            errors.db = "Could not update profile";
            this.logger.err(errors);
            res.json(errors);
        });
    }
    deleteProfile(req, res) {
        const errors = {};
        start_1.default.Profile.findOneAndRemove({ user: req.payload.userId })
            .then(() => {
            start_1.default.User.findByIdAndRemove({ _id: req.payload.userId })
                .then(() => res.json({ success: true }))
                .catch((err) => {
                errors.db = "Could not delete user";
                this.logger.err(errors);
                res.json(errors);
            });
        })
            .catch((err) => {
            this.logger.err(err);
            res.json(err);
        });
    }
};
tslib_1.__decorate([
    core_1.Get(":username"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "getProfileByUsername", null);
tslib_1.__decorate([
    core_1.Get(""),
    core_1.Middleware(jwt_1.JwtManager.middleware),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ProfileController.prototype, "getProfile", null);
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