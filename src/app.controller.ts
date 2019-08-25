import {
	Controller,
	Get,
	Request,
	Post,
	UseGuards,
	Response,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
	constructor(private readonly authService: AuthService) {}

	@Get()
	async serveApp(@Response() res) {}
}
