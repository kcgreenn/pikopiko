import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository, InsertResult } from 'typeorm';
import { ProfileService } from '../profile/profile.service';
import { Reply } from '../reply/reply.entity';
import { ReplyService } from '../reply/reply.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
    private readonly replyService: ReplyService,
    private readonly profileService: ProfileService,
  ) {}

  // Get all posts for generic feed; with pagination
  async getAllPosts(skip = 0, take = 10): Promise<Post[]> {
    try {
      return await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.replies', 'replies')
        .orderBy('post.createdDate', 'DESC')
        .skip(skip)
        .take(take)
        .getMany();
    } catch (err) {
      throw err;
    }
  }

  //   Get post by postId
  async getPostById(id: string): Promise<Post> {
    try {
      const post = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.replies', 'reply')
        .where('post.id = :id', { id })
        .getOne();
      return post;
    } catch (err) {
      throw err;
    }
  }

  //   Get posts by handle; with pagination
  async getPostsByHandle(handle: string, skip = 0, take = 10): Promise<Post[]> {
    try {
      return await this.postRepository
        .createQueryBuilder('post')
        .where('handle = :handle', { handle })
        .orderBy('post.createdDate', 'DESC')
        .skip(skip)
        .take(take)
        .getMany();
    } catch (err) {
      throw err;
    }
  }

  //   Get posts by topic w/ pagination
  async getPostsByTopic(topic: string, skip = 0, take = 10): Promise<Post[]> {
    try {
      return await this.postRepository
        .createQueryBuilder('post')
        .where('topic = :topic', { topic })
        .orderBy('post.createdDate', 'DESC')
        .skip(skip)
        .take(take)
        .getMany();
    } catch (err) {
      throw err;
    }
  }

  // Get trending data
  // select topic
  // from "Post"
  // where "createdDate" > now() - interval '1 hour'

  //   Create a new post
  async createPost(id: string, text: string, topic: string): Promise<Post> {
    try {
      // Find profile by id
      const profile = await this.profileService.getProfileById(id);
      const insertResult = await this.postRepository
        .createQueryBuilder()
        .insert()
        .into(Post)
        .values([
          {
            handle: profile.handle,
            text,
            topic,
            likes: [],
            profile,
            replies: [],
          },
        ])
        .execute();
      const postId = insertResult.identifiers[0].id;
      const newPost = await this.getPostById(postId.toString());
      // Pass newly created post to profile
      await this.profileService.savePostToProfile(profile.id, newPost);
      return newPost;
    } catch (err) {
      throw err;
    }
  }

  //   like/dislike post
  async likePost(postId: string, userId: string): Promise<Post> {
    try {
      const post = await this.getPostById(postId);
      // check if userId has already liked post
      if (post.likes.some(like => like === userId)) {
        // unlike
        post.likes.splice(post.likes.indexOf(userId), 1);
        return await this.postRepository.save(post);
      } else {
        post.likes.push(userId);
        return await this.postRepository.save(post);
      }
    } catch (err) {
      throw err;
    }
  }

  //   reply to post
  async replyToPost(
    handle: string,
    text: string,
    postId: string,
  ): Promise<Post> {
    try {
      // Get post to reply to
      const post = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.replies', 'reply')
        .where('post.id = :id', { id: postId })
        .getOne();
      // insert new reply and return reply id
      const result: InsertResult = await this.replyRepository
        .createQueryBuilder()
        .insert()
        .into(Reply)
        .values([{ handle, text, post }])
        .execute();
      // return new reply and add to post
      const reply = await this.replyRepository.findOne(result.identifiers[0]);
      post.replies = [...post.replies, reply];
      return await this.postRepository.save(post);
    } catch (err) {
      throw err;
    }
  }
}
