import {
	Controller,
	Middleware,
	Get,
	Post,
	Put,
	Delete
} from "@overnightjs/core";
import { OK, BAD_REQUEST, NOT_FOUND } from "http-status-codes";
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
				res.status(BAD_REQUEST).json(err);
			});
	}
}
