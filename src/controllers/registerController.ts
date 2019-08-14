import { Controller, Post } from "@overnightjs/core";
import { BAD_REQUEST, CREATED } from "http-status-codes";
import { Request, Response } from "express";
import { Logger } from "@overnightjs/logger";
import { ErrorsI } from "./errors";
import { DB } from "../db";
import bcrypt from "bcryptjs";

@Controller("api/users")
export class RegisterController {
	private readonly logger: Logger;

	constructor() {
		this.logger = new Logger();
	}
	// @route   /api/users/register
	// @desc    Register a new user account
	// @access  Public
	@Post("register")
	private post(req: Request, res: Response) {
		const errors: ErrorsI = {};
		const { email, password, password2 } = req.body;
		// Check if passwords are the same
		if (password !== password2) {
			errors.password2 = "Passwords must match";
			return res.status(BAD_REQUEST).json(errors);
		}
		// Check if email is already registered
		DB.Models.User.findOne({ email: email })
			.then((user) => {
				if (user) {
					errors.email =
						"That email is already registered on this site.";
					return res.status(BAD_REQUEST).json(errors);
				}
				//   Hash Password before saving to db
				bcrypt
					.hash(password, 12)
					.then((hashedPassword) => {
						const newUser = new DB.Models.User({
							email,
							password: hashedPassword
						});
						newUser
							.save()
							.then(
								(user): void => {
									res.status(CREATED).json(user);
								}
							)
							.catch(
								(err: any): void => {
									errors.db = err;
									this.logger.err(new Error(errors.db));
									res.status(BAD_REQUEST).json(errors.db);
								}
							);
					})
					.catch(
						(err: any): void => {
							errors.db = err;
							this.logger.err(new Error(errors.db));
							res.status(BAD_REQUEST).json(errors.db);
						}
					);
			})
			.catch((err) => {
				errors.db = err;
				this.logger.err(new Error(errors.db));
				res.status(BAD_REQUEST).json(errors);
			});
	}
}
