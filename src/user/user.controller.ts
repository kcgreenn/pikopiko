import {
  Controller,
  Get,
  Body,
  Post,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/count')
  async userCount(): Promise<number> {
    try {
      return await this.userService.userCount();
    } catch (err) {
      throw err;
    }
  }

  // route    DELETE api/user/
  // desc     Delete current user with jwt creds and password
  // access   Private
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteUser(@Body() body, @Req() req): Promise<DeleteResult> {
    try {
      const { password } = body;
      const { id } = req.user;
      return await this.userService.deleteUser(id, password);
    } catch (err) {
      throw err;
    }
  }
}
