import { Controller, Get, Post, Middleware } from "@overnightjs/core";
import * as HttpStatus from "http-status-codes";
import { Request, Response } from "express";
import { Logger } from "@overnightjs/logger";
import { ErrorsI } from "./errors";
import { DB } from "../db";
import { JwtManager, ISecureRequest } from "@overnightjs/jwt";

@Controller("/api/posts")
export class PostController {
	private readonly logger: Logger;

	constructor() {
		this.logger = new Logger();
	}

	// @route   Get /api/posts
	// @desc    Return most recent posts
	// @access  Public

	// TODO Limit posts to those from users you are following

	@Get("")
	private getRecentPosts(req: Request, res: Response) {
		const errors: ErrorsI = {};

		DB.Models.Post.find()
			.sort({ date: -1 })
			.then((posts) => res.json(posts))
			.catch((err) => {
				errors.db = "Could not retrieve posts";
				this.logger.err(errors);
				res.status(HttpStatus.NOT_FOUND).json(errors);
			});
	}

	// @route   Get /api/posts/:postId
	// @desc    Get Post by id
	// @access  Public

	@Get(":postId")
	private getPostById(req: Request, res: Response) {
		const errors: ErrorsI = {};

		DB.Models.Post.findById(req.params.id)
			.then((post) => res.status(HttpStatus.OK).json(post))
			.catch((err) => {
				errors.db = "Could not find that post";
				this.logger.err(errors);
				res.status(HttpStatus.NOT_FOUND).json(errors);
			});
	}

	// @route   Post /api/posts
	// @desc    Create a new post
	// @access  Private

	@Post("")
	@Middleware(JwtManager.middleware)
	private createPost(req: ISecureRequest, res: Response) {
		const errors: ErrorsI = {};

		const { text } = req.body;
		const userId = req.payload.user;

		new DB.Models.Post({ user: userId, text })
			.save()
			.then((post) => res.status(HttpStatus.CREATED).json(post))
			.catch((err) => {
				errors.db = "Could not create post";
				this.logger.err(errors);
				res.status(HttpStatus.BAD_REQUEST).json(errors);
			});
	}

	// @route   Post /api/post/:postId/like
	// @desc    Like/Unlike post
	// @access  Private

	@Post("/:postId/like")
	@Middleware(JwtManager.middleware)
	private likePost(req: ISecureRequest, res: Response) {
		const errors: ErrorsI = {};

		DB.Models.Post.findById(req.params.id).then((post) => {
			if (post) {
				if (
					post.likes.filter((like) => (like = req.payload.user))
						.length > 0
				) {
					// If user has already liked this post, unlike
					post.likes.splice(post.likes.indexOf(req.payload.user), 1);
					// Save post
					post.save()
						.then((post) => res.status(HttpStatus.OK).json(post))
						.catch((err) => {
							errors.db = "Could not save to database";
							this.logger.err(errors);
							res.status(HttpStatus.BAD_REQUEST).json(errors);
						});
				} else {
					// If user has not liked this post, like
					post.likes.push(req.payload.user);
					post.save()
						.then((post) => res.status(HttpStatus.OK).json(post))
						.catch((err) => {
							errors.db = "Could not save to database";
							this.logger.err(errors);
							res.status(HttpStatus.BAD_REQUEST).json(errors);
						});
				}
			} else {
				errors.db = "Post not found";
				this.logger.err(errors);
				return res.status(HttpStatus.NOT_FOUND).json(errors);
			}
		});
	}
}
