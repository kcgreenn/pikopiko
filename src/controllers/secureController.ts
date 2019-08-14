import { Controller, Middleware, Get } from "@overnightjs/core";
import { OK, BAD_REQUEST, NOT_FOUND } from "http-status-codes";
import { Response } from "express";
import { Logger } from "@overnightjs/logger";
import { JwtManager, ISecureRequest } from "@overnightjs/jwt";
import dotenv from "dotenv";
dotenv.config();

@Controller("api/users")
export class SecureController {
	private readonly logger: Logger;

	constructor() {
		this.logger = new Logger();
	}
	// @route   /api/users/login
	// @desc    Login a user
	// @access  Public
	@Get("secret")
	@Middleware(JwtManager.middleware)
	private get(req: ISecureRequest, res: Response) {
		return res.status(OK).json({
			user: req.payload
		});
	}
}
