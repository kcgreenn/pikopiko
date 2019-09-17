import {
  Controller,
  UseGuards,
  Get,
  Req,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { Profile } from './profile.entity';
import { Post } from 'src/post/post.entity';

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
      const { bio } = body;
      return await this.profileService.updateProfile(id, bio);
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

  // @route   GET api/profile/feed
  // @desc    Return array of posts from followed users with pagination
  // @access  Private
  @UseGuards(AuthGuard('jwt'))
  @Get('feed/q?')
  async getPostFeed(@Query() query, @Req() req): Promise<Post[]> {
    try {
      const { handle } = req.user;
      const { skip } = query;
      return await this.profileService.getFeedPosts(handle, skip);
    } catch (err) {
      throw err;
    }
  }
}
