"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@overnightjs/core");
const HttpStatus = tslib_1.__importStar(require("http-status-codes"));
const logger_1 = require("@overnightjs/logger");
const start_1 = tslib_1.__importDefault(require("../start"));
const jwt_1 = require("@overnightjs/jwt");
let PostController = class PostController {
    constructor() {
        this.logger = new logger_1.Logger();
    }
    getRecentPosts(req, res) {
        const errors = {};
        start_1.default.Post.find()
            .sort({ date: -1 })
            .then((posts) => res.json(posts))
            .catch((err) => {
            errors.db = "Could not retrieve posts";
            this.logger.err(errors);
            res.status(HttpStatus.NOT_FOUND).json(errors);
        });
    }
    getPostById(req, res) {
        const errors = {};
        start_1.default.Post.findById(req.params.id)
            .then((post) => res.status(HttpStatus.OK).json(post))
            .catch((err) => {
            errors.db = "Could not find that post";
            this.logger.err(errors);
            res.status(HttpStatus.NOT_FOUND).json(errors);
        });
    }
    createPost(req, res) {
        const errors = {};
        const { text } = req.body;
        const { userId, userName } = req.payload;
        new start_1.default.Post({ user: userId, text, userName })
            .save()
            .then((post) => res.status(HttpStatus.CREATED).json(post))
            .catch((err) => {
            errors.db = "Could not create post";
            this.logger.err(errors);
            res.status(HttpStatus.BAD_REQUEST).json(errors);
        });
    }
    likePost(req, res) {
        const errors = {};
        start_1.default.Post.findById(req.params.id).then((post) => {
            if (post) {
                if (post.likes.filter((like) => (like = req.payload.user))
                    .length > 0) {
                    post.likes.splice(post.likes.indexOf(req.payload.user), 1);
                    post.save()
                        .then((post) => res.status(HttpStatus.OK).json(post))
                        .catch((err) => {
                        errors.db = "Could not save to database";
                        this.logger.err(errors);
                        res.status(HttpStatus.BAD_REQUEST).json(errors);
                    });
                }
                else {
                    post.likes.push(req.payload.user);
                    post.save()
                        .then((post) => res.status(HttpStatus.OK).json(post))
                        .catch((err) => {
                        errors.db = "Could not save to database";
                        this.logger.err(errors);
                        res.status(HttpStatus.BAD_REQUEST).json(errors);
                    });
                }
            }
            else {
                errors.db = "Post not found";
                this.logger.err(errors);
                return res.status(HttpStatus.NOT_FOUND).json(errors);
            }
        });
    }
};
tslib_1.__decorate([
    core_1.Get(""),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], PostController.prototype, "getRecentPosts", null);
tslib_1.__decorate([
    core_1.Get(":postId"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], PostController.prototype, "getPostById", null);
tslib_1.__decorate([
    core_1.Post(""),
    core_1.Middleware(jwt_1.JwtManager.middleware),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], PostController.prototype, "createPost", null);
tslib_1.__decorate([
    core_1.Post("/:postId/like"),
    core_1.Middleware(jwt_1.JwtManager.middleware),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], PostController.prototype, "likePost", null);
PostController = tslib_1.__decorate([
    core_1.Controller("/api/posts"),
    tslib_1.__metadata("design:paramtypes", [])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=postController.js.map