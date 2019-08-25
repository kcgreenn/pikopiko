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

	@Get(':name')
	async findOneByName(
		@Param() params: any,
		@Response() res: res,
	): Promise<res> {
		const user: User = await this.userService.findOneByName(params.name);
		return res.status(HttpStatus.OK).json(user);
	}

	@UseGuards(AuthGuard('local'))
	@Post('login')
	async login(@Request() req) {
		return this.authService.login(req.user);
	}

	@Post('register')
	async create(
		@Body() createUserDto: CreateUserDto,
		@Response() res: res,
	): Promise<res> {
		try {
			const user = await this.userService.create(createUserDto);
			if (typeof user === 'string') {
				return res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(user);
			}
			return res.status(HttpStatus.CREATED).json(user);
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

	@UseGuards(AuthGuard('jwt'))
	@Delete()
	async delete(@Request() req, @Response() res: res): Promise<any> {
		try {
			await this.userService.delete(req.user);
			return res.status(HttpStatus.OK).json({});
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
