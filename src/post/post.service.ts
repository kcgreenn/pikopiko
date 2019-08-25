import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { Reply } from '../reply/reply.entity';
import { ReplyService } from '../reply/reply.service';

@Injectable()
export class PostService {
	constructor(
		@InjectRepository(Post)
		private readonly postRepository: Repository<Post>,
		@Inject(forwardRef(() => UsersService))
		private readonly usersService: UsersService,
		@Inject(ReplyService) private readonly replyService: ReplyService,
	) {}

	async createPost({ userId, username }, body: any): Promise<Post> {
		try {
			// Create new post
			const newPost = new Post();
			newPost.text = body.text;
			newPost.username = username;
			newPost.likes = [];
			newPost.replies = [];
			newPost.user = userId;
			await this.postRepository.save(newPost);
			return newPost;
		} catch (err) {
			throw err;
		}
	}

	async getUsersPosts({ username }, skip = 10, take = 0): Promise<Post[]> {
		try {
			return await this.postRepository
				.createQueryBuilder('post')
				.where('post.username = :username', { username })
				.skip(skip)
				.take(take)
				.getMany();
		} catch (err) {
			throw err;
		}
	}

	async getLatestPostFromUser(username, skip = 0): Promise<Post> {
		try {
			return await this.postRepository
				.createQueryBuilder('post')
				.where('post.username = :username', { username })
				.orderBy('post.createdDate', 'ASC')
				.getOne();
		} catch (err) {
			throw err;
		}
	}

	async getPostById(postId): Promise<Post> {
		try {
			// return await this.postRepository.findOne({ id: postId });
			return await this.postRepository
				.createQueryBuilder('post')
				.where('post.id = :id', { id: postId })
				.leftJoinAndSelect('post.replies', 'reply')
				.take(5)
				.getOne();
		} catch (err) {
			throw err;
		}
	}

	async likePost(postId: number, userId: string): Promise<Post> {
		try {
			const post = await this.postRepository.findOne({ id: postId });
			// Check if already liked by this user
			if (post.likes.some((item) => item === userId + '')) {
				const likeToRemove: number = post.likes.indexOf(userId + '');
				// console.log(likeToRemove);
				post.likes.splice(0, 1);
			} else {
				post.likes.push(userId);
			}
			return await this.postRepository.save(post);
		} catch (err) {
			throw err;
		}
	}

	async replyToPost(postId, username, text): Promise<Post> {
		try {
			const post: Post = await this.postRepository.findOne({
				id: postId,
			});
			const reply = await this.replyService.createReply(
				post,
				username,
				text,
			);
			await this.postRepository.save(post);
			return post;
		} catch (err) {
			throw err;
		}
	}
}
