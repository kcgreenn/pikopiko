import {
	Controller,
	Get,
	Post,
	Request,
	Response,
	Body,
	Param,
	HttpException,
	HttpStatus,
	Delete,
	UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './create-user.dto';
import { Request as req, Response as res } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller('api/users')
export class UsersController {
	constructor(
		private readonly userService: UsersService,
		private readonly authService: AuthService,
	) {}

	// @route	POST /api/users/login
	// @desc	Authenitcate user with username and password
	// @access	Private
	@UseGuards(AuthGuard('local'))
	@Post('login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	// @route	POST /api/users/register
	// @desc	Create and return a new user with req.body data
	// @access	Public
	@Post('register')
	async create(
		@Body() createUserDto: CreateUserDto,
		@Response() res: res,
	): Promise<res> {
		try {
			const message = await this.userService.create(createUserDto);

			return res.status(HttpStatus.CREATED).json(message);
		} catch (err) {
			throw new HttpException(
				{
					status: HttpStatus.UNPROCESSABLE_ENTITY,
					error: err,
				},
				422,
			);
		}
	}

	// @route	DELETE /api/users/
	// @desc	Delete current user with jwt userId
	// @access	Private
	@UseGuards(AuthGuard('jwt'))
	@Delete()
	async delete(@Request() req, @Response() res: res): Promise<any> {
		try {
			const message = await this.userService.delete(req.user);
			return res.status(HttpStatus.OK).json(message);
		} catch (err) {
			console.log(err);
			throw new HttpException(
				{
					status: HttpStatus.NOT_FOUND,
					error: err,
				},
				404,
			);
		}
	}
}
