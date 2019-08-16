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
            .limit(10)
            .then((posts) => res.json(posts))
            .catch((err) => {
            errors.db = "Could not retrieve posts";
            this.logger.err(errors);
            res.status(HttpStatus.NOT_FOUND).json(errors);
        });
    }
    getPostById(req, res) {
        const errors = {};
        start_1.default.Post.findById(req.params.postId)
            .then((post) => {
            if (post) {
                res.status(HttpStatus.OK).json(post);
            }
        })
            .catch((err) => {
            errors.db = "Could not find that post";
            this.logger.err(errors);
            res.status(HttpStatus.NOT_FOUND).json(errors);
        });
    }
    addPost(req, res) {
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
        start_1.default.Post.findById(req.params.postId).then((post) => {
            if (post) {
                if (post.likes.filter((like) => (like = req.payload.userId))
                    .length > 0) {
                    post.likes.splice(post.likes.indexOf(req.payload.userId), 1);
                    post.save()
                        .then((post) => res.status(HttpStatus.OK).json(post))
                        .catch((err) => {
                        errors.db = "Could not save to database";
                        this.logger.err(errors);
                        res.status(HttpStatus.BAD_REQUEST).json(errors);
                    });
                }
                else {
                    post.likes.push(req.payload.userId);
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
    replyToPost(req, res) {
        const errors = {};
        start_1.default.Post.findById(req.params.postId)
            .then((post) => {
            if (post) {
                const newReply = {
                    text: req.body.text,
                    userName: req.payload.userName,
                    user: req.payload.userId
                };
                post.replies.push(newReply);
                post.save()
                    .then((post) => res.status(HttpStatus.CREATED).json(post))
                    .catch((err) => {
                    errors.db = "Could not create post";
                    this.logger.err(err);
                    res.status(HttpStatus.BAD_REQUEST).json(errors);
                });
            }
            else {
                errors.db = "Could not find post";
                this.logger.err(errors);
                return res.status(HttpStatus.NOT_FOUND).json(errors);
            }
        })
            .catch((err) => {
            errors.db = "Could not find post";
            this.logger.err(err);
            return res.status(HttpStatus.NOT_FOUND).json(errors);
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
], PostController.prototype, "addPost", null);
tslib_1.__decorate([
    core_1.Post(":postId/like"),
    core_1.Middleware(jwt_1.JwtManager.middleware),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], PostController.prototype, "likePost", null);
tslib_1.__decorate([
    core_1.Post(":postId/replies"),
    core_1.Middleware(jwt_1.JwtManager.middleware),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], PostController.prototype, "replyToPost", null);
PostController = tslib_1.__decorate([
    core_1.Controller("api/posts"),
    tslib_1.__metadata("design:paramtypes", [])
], PostController);
exports.PostController = PostController;
//# sourceMappingURL=postController.js.map