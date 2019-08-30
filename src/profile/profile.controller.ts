import {
  Controller,
  UseGuards,
  Get,
  Req,
  Patch,
  Body,
  Param,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { Profile } from './profile.entity';

@Controller('api/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  // route    GET /api/profile
  // desc     Get current user's profile
  // access   Private
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getCurUserProfile(@Req() req): Promise<Profile> {
    try {
      return await this.profileService.getProfileById(req.user.id);
    } catch (err) {
      throw err;
    }
  }

  // route    GET /api/profile/:handle
  // desc     Get profile by handle
  // access   Public
  @Get(':handle')
  async getProfileByHandle(@Param() params): Promise<Profile> {
    try {
      return await this.profileService.getProfileByHandle(params.handle);
    } catch (err) {
      throw err;
    }
  }

  // route    PATCH /api/profile
  // desc     Update current user's profile
  // access   Private
  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async updateProfile(@Req() req, @Body() body): Promise<Profile> {
    try {
      const { id } = req.user;
      const { bio, interests } = body;
      return await this.profileService.updateProfile(id, bio, interests);
    } catch (err) {
      throw err;
    }
  }

  // route    POST /api/profile/follow/:handle
  // desc     Update current user's profile
  // access   Private
  @UseGuards(AuthGuard('jwt'))
  @Patch('follow/:handle')
  async followUser(@Req() req, @Param() params): Promise<Profile> {
    try {
      const { id } = req.user;
      const { handle } = params;
      return await this.profileService.followUser(id, handle);
    } catch (err) {
      throw err;
    }
  }
}
