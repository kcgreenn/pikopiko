import { Controller, Post } from "@overnightjs/core";
import * as HttpStatus from "http-status-codes";
import { Request, Response } from "express";
import { Logger } from "@overnightjs/logger";
import { ErrorsI } from "./errors";
import bcrypt from "bcryptjs";
import { JwtManager } from "@overnightjs/jwt";
import dotenv from "dotenv";
dotenv.config();
import db from "../start";

@Controller("api/users")
export class UserController {
	private readonly logger: Logger;

	constructor() {
		this.logger = new Logger();
	}

	// @route   /api/users/login
	// @desc    Login a user
	// @access  Public

	@Post("login")
	private login(req: Request, res: Response) {
		const errors: ErrorsI = {};
		const { email, password } = req.body;
		// Find user by email
		db.User.findOne({ email })
			.then((user) => {
				if (user === null) {
					errors.email = "User not found";
					res.status(HttpStatus.NOT_FOUND).json(errors);
				} else {
					// compare hashed passwords
					bcrypt
						.compare(password, user.password)
						.then((isMatch) => {
							if (isMatch) {
								// If passwords match, send jwt
								const jwtStr = JwtManager.jwt({
									userName: user.username,
									userId: user._id
								});
								return res.status(HttpStatus.OK).json({
									jwt: jwtStr
								});
							}
						})
						.catch((err) => {
							errors.db = "Server error";
							res.status(HttpStatus.BAD_REQUEST).json(errors);
						});
				}
			})
			.catch((err) => {
				errors.db = "Could not find user in database";
				res.status(HttpStatus.BAD_REQUEST).json(errors);
			});
	}

	// @route   /api/users/register
	// @desc    Register a new user account
	// @access  Public

	@Post("register")
	private register(req: Request, res: Response) {
		const errors: ErrorsI = {};
		const { email, password, password2, username } = req.body;
		// Check if passwords are the same
		if (password !== password2) {
			errors.password2 = "Passwords must match";
			return res.status(HttpStatus.BAD_REQUEST).json(errors);
		}
		// Check if email is already registered
		db.User.findOne({ email: email })
			.then((user) => {
				if (user) {
					errors.email =
						"That email is already registered on this site.";
					return res.status(HttpStatus.BAD_REQUEST).json(errors);
				}
				db.User.findOne({ username: username })
					.then((user) => {
						if (user) {
							errors.username = "That username is already taken";
							return res
								.status(HttpStatus.BAD_REQUEST)
								.json(errors);
						}
						//   Hash Password before saving to db
						bcrypt
							.hash(password, 12)
							.then((hashedPassword) => {
								const newUser = new db.User({
									email,
									password: hashedPassword,
									username
								});
								newUser
									.save()
									.then(
										(user): void => {
											res.status(HttpStatus.CREATED).json(
												user
											);
										}
									)
									.catch(
										(err: any): void => {
											errors.db = err;
											this.logger.err(
												new Error(errors.db)
											);
											res.status(
												HttpStatus.BAD_REQUEST
											).json(errors.db);
										}
									);
							})
							.catch(
								(err: any): void => {
									errors.db = err;
									this.logger.err(new Error(errors.db));
									res.status(HttpStatus.BAD_REQUEST).json(
										errors.db
									);
								}
							);
					})
					.catch((err) => {
						errors.db = "Could not complete request";
						this.logger.err(errors);
						res.status(HttpStatus.BAD_REQUEST).json(errors);
					});
			})
			.catch((err) => {
				errors.db = err;
				this.logger.err(new Error(errors.db));
				res.status(HttpStatus.BAD_REQUEST).json(errors);
			});
	}
}
