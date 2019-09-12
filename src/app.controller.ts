import {
  Controller,
  Get,
  UseGuards,
  Post,
  Request,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // route    POST /login
  // desc     Login with req.body, return jwt
  // access   Private
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // route    POST /register
  // desc     Create a new user with req.body, then login as that user
  // access   Public
  @Post('register')
  async register(@Body() body): Promise<any> {
    try {
      const { handle, email, password } = body;
      const uuid = await this.userService.createUser({
        handle,
        email,
        password,
      });
      return await this.authService.login({ handle, password });
    } catch (err) {
      throw err;
    }
  }
}
