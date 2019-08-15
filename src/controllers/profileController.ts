import {
	Controller,
	Middleware,
	Get,
	Post,
	Put,
	Delete
} from "@overnightjs/core";
import * as HttpStatus from "http-status-codes";
import { Request, Response } from "express";
import { Logger } from "@overnightjs/logger";
import { JwtManager, ISecureRequest } from "@overnightjs/jwt";
import dotenv from "dotenv";
dotenv.config();
import { ErrorsI } from "./errors";
import { DB } from "../db";

@Controller("api/profile")
export class ProfileController {
	private readonly logger: Logger;

	constructor() {
		this.logger = new Logger();
	}

	// @route	GET /api/profile/:username
	// @desc	Get profile by username
	// @access	Public
	@Get(":userId")
	private getById(req: Request, res: Response) {
		const errors: ErrorsI = {};
		DB.Models.Profile.findOne(req.params.userId)
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

	// @route	GET /api/profile
	// @desc	Get current user's profile
	// @access	Private

	@Get("")
	@Middleware(JwtManager.middleware)
	private get(req: ISecureRequest, res: Response) {
		const errors: ErrorsI = {};
		DB.Models.Profile.findOne({ user: req.payload.user })
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

	// @route	POST /api/profile
	// @desc	Create current user's profile
	// @access	Private

	@Post("")
	@Middleware(JwtManager.middleware)
	private createProfile(req: ISecureRequest, res: Response) {
		const errors: ErrorsI = {};
		const { avatar, githubrepo, handle } = req.body;
		let { following, interests, technologies } = req.body;
		const userId = req.payload.user;
		// Split interests into array
		interests = interests !== undefined ? interests.split(",") : null;
		// Split technologies into array
		technologies =
			technologies !== undefined ? technologies.split(",") : null;
		following = following !== undefined ? following.split(",") : null;
		const db = DB.Models.Profile;
		// Check if User already has profile
		db.findOne({ userId })
			.then((profile) => {
				// If user does not have profile, check if handle is taken
				if (!profile) {
					db.findOne({ handle })
						.then((profile) => {
							if (profile) {
								errors.handle = "That handle is already in use";
								res.status(HttpStatus.CONFLICT).json(errors);
							} else {
								// Create new profile
								new db({
									avatar,
									githubrepo,
									handle,
									interests,
									technologies,
									user: userId
								})
									.save()
									.then((profile) =>
										res
											.status(HttpStatus.CREATED)
											.json(profile)
									)
									.catch((err) => {
										res.json(err);
									});
							}
						})
						.catch((err) => {
							res.json(err);
						});
				} else {
					errors.profile = "User already has profile";
					res.status(HttpStatus.CONFLICT).json(errors);
				}
			})
			.catch((err) => {
				errors.db = "Could not connect to database";
				res.status(HttpStatus.BAD_REQUEST).json(errors);
			});
	}

	// @route	PUT /api/profile
	// @desc	Edit current user's profile
	// @access	Private

	@Put("")
	@Middleware(JwtManager.middleware)
	private editProfile(req: ISecureRequest, res: Response) {
		const errors: ErrorsI = {};
		const { avatar, githubrepo } = req.body;
		let { interests, technologies } = req.body;
		const userId = req.payload.user;
		// Split interests into array
		interests = interests !== undefined ? interests.split(",") : null;
		// Split technologies into array
		technologies =
			technologies !== undefined ? technologies.split(",") : null;
		const db = DB.Models.Profile;
		db.findOneAndUpdate(
			{ user: userId },
			{ avatar, githubrepo, interests, technologies }
		)
			.then((profile) => res.status(HttpStatus.ACCEPTED).json(profile))
			.catch((err) => {
				this.logger.err(err);
				res.json(err);
			});
	}

	// @route	DELETE /api/profile
	// @desc	Delete current user's profile
	// @access	Private

	@Delete("")
	@Middleware(JwtManager.middleware)
	private deleteProfile(req: ISecureRequest, res: Response) {
		const errors: ErrorsI = {};
		// Find User's Profile
		const db = DB.Models.Profile;

		db.findOneAndRemove({ user: req.payload.user })
			.then(() => {
				DB.Models.User.findByIdAndRemove({ _id: req.payload.user })
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
}
