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

	async createPost(
		{ userId, username },
		body: any,
	): Promise<{ message: string }> {
		try {
			const { text } = body;
			// Create new post
			await this.postRepository
				.createQueryBuilder('post')
				.insert()
				.into(Post)
				.values([
					{ text, username, user: userId, likes: [], replies: [] },
				])
				.execute();
			return { message: 'Post Created' };
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
				.skip(skip)
				.orderBy('post.createdDate', 'ASC')
				.getOne();
		} catch (err) {
			throw err;
		}
	}

	async getPostById(postId, skip = 0, take = 10): Promise<Post> {
		try {
			// return await this.postRepository.findOne({ id: postId });
			return await this.postRepository
				.createQueryBuilder('post')
				.where('post.id = :id', { id: postId })
				.leftJoinAndSelect('post.replies', 'reply')
				.skip(skip)
				.take(10)
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

	async replyToPost(postId, username, text): Promise<Reply> {
		try {
			const post: Post = await this.postRepository.findOne({
				id: postId,
			});
			console.log('replyin in post');
			const reply = await this.replyService.createReply(
				post,
				username,
				text,
			);
			await this.postRepository.save(post);
			return reply;
		} catch (err) {
			throw err;
		}
	}
}
