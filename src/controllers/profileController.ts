import {
	Controller,
	Middleware,
	Get,
	Post,
	Put,
	Delete
} from "@overnightjs/core";
import {
	OK,
	BAD_REQUEST,
	NOT_FOUND,
	CONFLICT,
	CREATED
} from "http-status-codes";
import { Request, Response } from "express";
import { Logger } from "@overnightjs/logger";
import { JwtManager, ISecureRequest } from "@overnightjs/jwt";
import dotenv from "dotenv";
dotenv.config();
import { ErrorsI } from "./errors";
import { DB } from "../db";
import { Profile } from "src/models";

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
				res.status(NOT_FOUND).json(errors);
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
					return res.status(NOT_FOUND).json(errors);
				}
				res.json(profile);
			})
			.catch((err) => {
				this.logger.err(err);
				res.status(BAD_REQUEST).json(err);
			});
	}

	@Post("")
	@Middleware(JwtManager.middleware)
	private createProfile(req: ISecureRequest, res: Response) {
		const errors: ErrorsI = {};
		const { avatar, githubrepo, handle } = req.body;
		let { interests, technologies } = req.body;
		const userId = req.payload.user;
		// Split interests into array
		interests = interests !== undefined ? interests.split(",") : null;
		// Split technologies into array
		technologies =
			technologies !== undefined ? technologies.split(",") : null;
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
								res.status(CONFLICT).json(errors);
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
										res.status(CREATED).json(profile)
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
					res.status(CONFLICT).json(errors);
				}
			})
			.catch((err) => {
				errors.db = "Could not connect to database";
				res.status(BAD_REQUEST).json(errors);
			});
	}
}
