import {
	Controller,
	Get,
	UseGuards,
	Param,
	Post,
	Request,
	Response,
	Put,
	Body,
	HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Profile } from '../profile/profile.entity';
import { ProfileService } from './profile.service';

@Controller('api/profile')
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}
	// @route   GET /api/profile/:username
	// @desc    Return profile data of username
	// @access  Private
	@UseGuards(AuthGuard('jwt'))
	@Get()
	async getUserProfile(@Request() req): Promise<Profile> {
		try {
			// call findOne profile service with req.user.userid
			return await this.profileService.getProfile(req.user.userId);
		} catch (err) {
			throw err;
		}
	}

	// @route   PUT /api/profile
	// @desc    Update profile for req.user
	// @access  Private
	@UseGuards(AuthGuard('jwt'))
	@Put()
	async updateProfile(
		@Request() req: any,
		@Body() body: any,
		@Response() res: any,
	): Promise<Profile> {
		try {
			const profile = await this.profileService.updateProfile(
				req.user,
				body,
			);
			return res.status(HttpStatus.CREATED).json(profile);
		} catch (err) {
			throw err;
		}
	}

	// @route   POST /api/profile/follow/:username
	// @desc    Add username to follow array
	// @access  Private
	@UseGuards(AuthGuard('jwt'))
	@Post('follow/:username')
	async follow(@Request() req: any, @Param() params: any) {
		try {
			return await this.profileService.followUser(
				req.user.userId,
				params.username,
			);
		} catch (err) {
			throw err;
		}
	}

	// @route   GET /api/profile/feed
	// @desc    Get a feed of posts from followed users
	// @access  Private
	@UseGuards(AuthGuard('jwt'))
	@Get('feed')
	async getFeed(@Request() req: any, @Response() res: any): Promise<any[]> {
		try {
			const feedList = await this.profileService.getFeed(req.user.userId);
			return res.status(HttpStatus.FOUND).json(feedList);
		} catch (err) {
			throw err;
		}
	}
}
