import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Req,
  Body,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { AuthGuard } from '@nestjs/passport';
import { InsertResult } from 'typeorm';

@Controller('api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @route    GET /all/?
  // @desc     Return array of most recent posts with pagination
  // @access   Public
  @Get('all/?')
  async getAllPosts(@Query() query): Promise<PostEntity[]> {
    try {
      const { skip, take } = query;
      return await this.postService.getAllPosts(skip, take);
    } catch (err) {
      throw err;
    }
  }

  // @route    GET /handle/?
  // @desc     Return array of most recent posts by handle w/ pagination
  // @access   Public

  @Get('handle/?')
  async getPostsByHandle(@Query() query): Promise<PostEntity[]> {
    try {
      console.log(query);
      const { handle, skip, take } = query;
      return await this.postService.getPostsByHandle(handle, skip, take);
    } catch (err) {
      throw err;
    }
  }

  // @route  GET /interest/?interest=&skip=&take=
  // @desc   Return most recent posts by topic/interest w/ pagination
  // @access Public
  @Get('topic/?')
  async getPostsByTopic(@Query() query): Promise<PostEntity[]> {
    try {
      const { topic, skip, take } = query;
      return await this.postService.getPostsByTopic(topic, skip, take);
    } catch (err) {
      throw err;
    }
  }

  // @route  GET /id/:postId
  // @desc   Returns a post of given id
  // @access Public
  @Get('id/:postId')
  async getPostById(@Param() params): Promise<PostEntity> {
    try {
      return await this.postService.getPostById(params.postId);
    } catch (err) {
      throw err;
    }
  }

  // @route  POST
  // @desc   Create a new post
  // @access Private
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(@Req() req, @Body() body): Promise<PostEntity> {
    try {
      return await this.postService.createPost(
        req.user.id,
        body.text,
        body.topic,
      );
    } catch (err) {
      throw err;
    }
  }

  // @route  POST /like/:id
  // @desc   Like or unlike a post
  // @access Private
  @UseGuards(AuthGuard('jwt'))
  @Post('like/:id')
  async likePost(@Req() req, @Param() params): Promise<PostEntity> {
    try {
      return await this.postService.likePost(params.id, req.user.id);
    } catch (err) {
      throw err;
    }
  }

  // @route   POST /reply/:id
  // @desc    Reply to post of given id
  // @access  Private
  @UseGuards(AuthGuard('jwt'))
  @Post('reply/:postId')
  async replyToPost(@Param() params, @Body() body): Promise<PostEntity> {
    try {
      return await this.postService.replyToPost(
        body.handle,
        body.text,
        params.postId,
      );
    } catch (err) {
      throw err;
    }
  }
}
