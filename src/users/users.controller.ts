import {
	Controller,
	Get,
	Post,
	Res,
	Body,
	HttpException,
	HttpStatus,
	Delete,
	UseGuards,
	Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { User } from './users.entity';

@Controller('api/users')
export class UsersController {
	constructor(
		private readonly userService: UsersService,
		private readonly authService: AuthService,
	) {}

	@Get('total')
	countUsers(): Promise<number> {
		return this.userService.countUsers();
	}

	// @route	POST /api/users/login
	// @desc	Authenitcate user with username and password
	// @access	Private
	@UseGuards(AuthGuard('local'))
	@Post('login')
	async login(@Req() req) {
		return this.authService.login(req.user);
	}

	// @route	POST /api/users/register
	// @desc	Create and return a new user with req.body data
	// @access	Public
	@Post('register')
	async create(@Body() body: CreateUserDto): Promise<any> {
		try {
			// Create new user
			return await this.userService.create(body);
		} catch (err) {
			throw new HttpException(
				'Email is already registered',
				HttpStatus.CONFLICT,
			);
		}
	}

	// @route	DELETE /api/users/
	// @desc	Delete current user with jwt userId
	// @access	Private
	@UseGuards(AuthGuard('jwt'))
	@Delete()
	async delete(@Req() req, @Res() res: Response): Promise<any> {
		try {
			const message = await this.userService.delete(req.user);
			return message;
		} catch (err) {
			throw err;
		}
	}
}
