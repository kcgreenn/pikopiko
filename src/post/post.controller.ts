import {
	Controller,
	UseGuards,
	Post,
	Response,
	Request,
	Body,
	Get,
	HttpStatus,
	Param,
	Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { Post as PostEntity } from './post.entity';
import { User } from '../users/users.entity';
import { Response as Res, Request as Req } from 'express';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('api/post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@UseGuards(AuthGuard('jwt'))
	@Post()
	async createPost(
		@Request() req: any,
		@Body() body: any,
	): Promise<PostEntity> {
		try {
			return await this.postService.createPost(req.user, body);
		} catch (err) {
			throw err;
		}
	}

	@Get('/q')
	async getUserPosts(
		@Query() query: any,
		@Response() res: any,
	): Promise<Res> {
		try {
			const posts = await this.postService.getUsersPosts(
				query,
				query.skip,
				query.take,
			);
			return res.status(HttpStatus.FOUND).json(posts);
		} catch (err) {
			throw err;
		}
	}

	@UseGuards(AuthGuard('jwt'))
	@Get()
	async getCurrentUsersPosts(
		@Request() req: any,
		@Response() res: Res,
	): Promise<Res> {
		try {
			const posts = await this.postService.getUsersPosts(req.user, 0, 10);
			return res.status(HttpStatus.CREATED).json(posts);
		} catch (err) {
			throw err;
		}
	}

	@Get('id/:id')
	async getPostById(
		@Param() params: any,
		@Response() res: Res,
	): Promise<Res> {
		try {
			const post = await this.postService.getPostById(params.id);
			return res.status(HttpStatus.FOUND).json(post);
		} catch (err) {
			throw err;
		}
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('like/:postId')
	async likePost(
		@Request() req: any,
		@Param() params: any,
		@Response() res: Res,
	): Promise<Res> {
		try {
			const post = await this.postService.likePost(
				params.postId,
				req.user.userId,
			);
			return res.status(HttpStatus.OK).json(post);
		} catch (err) {
			throw err;
		}
	}

	@UseGuards(AuthGuard('jwt'))
	@Post('reply/:postId')
	async replyToPost(
		@Param() params: any,
		@Body() body: any,
		@Request() req: any,
		@Response() res: any,
	): Promise<Res> {
		try {
			const post = await this.postService.replyToPost(
				params.postId,
				req.user.username,
				body.text,
			);
			return res.status(HttpStatus.CREATED).json(post);
		} catch (err) {
			throw err;
		}
	}
}
