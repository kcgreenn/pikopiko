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
      console.log(post.replies);
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
      const newPost = await this.postRepository.findOne({
        id: insertResult.identifiers[0].id,
      });
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
      const post = await this.postRepository.findOne(postId);
      const newReply = new Reply();
      newReply.handle = handle;
      newReply.text = text;
      newReply.post = post;
      const reply = await this.replyRepository.save(newReply);
      post.replies.push(reply);
      return await this.postRepository.save(post);
    } catch (err) {
      throw err;
    }
  }
}
