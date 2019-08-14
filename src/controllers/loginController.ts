import { Controller, Post } from "@overnightjs/core";
import { OK, BAD_REQUEST, NOT_FOUND } from "http-status-codes";
import { Request, Response } from "express";
import { Logger } from "@overnightjs/logger";
import { ErrorsI } from "./errors";
import { DB } from "../mongo";
import bcrypt from "bcryptjs";
import { JwtManager } from "@overnightjs/jwt";
import dotenv from "dotenv";
dotenv.config();

@Controller("api/users")
export class LoginController {
	private readonly logger: Logger;

	constructor() {
		this.logger = new Logger();
	}
	// @route   /api/users/login
	// @desc    Login a user
	// @access  Public
	@Post("login")
	private post(req: Request, res: Response) {
		const errors: ErrorsI = {};
		const { email, password } = req.body;
		// Find user by email
		DB.Models.User.findOne({ email })
			.then((user) => {
				if (user === null) {
					errors.email = "User not found";
					res.status(NOT_FOUND).json(errors);
				} else {
					// compare hashed passwords
					bcrypt
						.compare(password, user.password)
						.then((isMatch) => {
							if (isMatch) {
								// If passwords match, send jwt
								const jwtStr = JwtManager.jwt({
									user: user._id
								});
								return res.status(OK).json({
									jwt: jwtStr
								});
							}
						})
						.catch((err) => {
							errors.db = "Server error";
							res.status(BAD_REQUEST).json(errors);
						});
				}
			})
			.catch((err) => {
				errors.db = "Could not find user in database";
				res.status(BAD_REQUEST).json(errors);
			});
	}
}
