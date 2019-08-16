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
import db from "../start";

@Controller("api/profile")
export class ProfileController {
	private readonly logger: Logger;

	constructor() {
		this.logger = new Logger();
	}

	// @route	GET /api/profile/:username
	// @desc	Get profile by username
	// @access	Public
	@Get(":username")
	private getProfileByUsername(req: Request, res: Response) {
		const errors: ErrorsI = {};
		db.Profile.findOne({ user: req.params.userId })
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
	private getProfile(req: ISecureRequest, res: Response) {
		const errors: ErrorsI = {};
		db.Profile.findOne({ user: req.payload.userId })
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
		const { avatar, bio } = req.body;
		let { following, interests } = req.body;
		const userId = req.payload.userId;
		// Split interests into array
		interests = interests !== undefined ? interests.split(",") : null;

		following = following !== undefined ? following.split(",") : null;
		// Check if User already has profile
		db.Profile.findOne({ userId })
			.then((profile) => {
				// If user does not have profile, check if handle is taken
				if (!profile) {
					// Create new profile
					new db.Profile({
						avatar,
						bio,
						interests,
						user: userId
					})
						.save()
						.then((profile) =>
							res.status(HttpStatus.CREATED).json(profile)
						)
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

	// @route	PUT /api/profile
	// @desc	Edit current user's profile
	// @access	Private

	@Put("")
	@Middleware(JwtManager.middleware)
	private editProfile(req: ISecureRequest, res: Response) {
		const errors: ErrorsI = {};
		const { avatar, bio } = req.body;
		let { interests } = req.body;
		const userId = req.payload.userId;
		// Split interests into array
		interests = interests !== undefined ? interests.split(",") : null;

		db.Profile.findOneAndUpdate(
			{ user: userId },
			{ avatar, bio, interests },
			{
				new: true
			}
		)
			.then((profile) => res.status(HttpStatus.ACCEPTED).json(profile))
			.catch((err) => {
				errors.db = "Could not update profile";
				this.logger.err(errors);
				res.json(errors);
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

		db.Profile.findOneAndRemove({ user: req.payload.userId })
			.then(() => {
				db.User.findByIdAndRemove({ _id: req.payload.userId })
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

	// TODO Get profiles of users with same interests
}
