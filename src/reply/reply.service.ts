import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reply } from './reply.entity';
import { Repository } from 'typeorm';
import { Post } from '../post/post.entity';

@Injectable()
export class ReplyService {
	constructor(
		@InjectRepository(Reply)
		private readonly replyRepository: Repository<Reply>,
	) {}

	async createReply(
		post: Post,
		username: string,
		text: string,
	): Promise<Reply> {
		try {
			const newReply = new Reply();
			newReply.post = post;
			newReply.text = text;
			newReply.username = username;
			return await this.replyRepository.save(newReply);
		} catch (err) {
			throw err;
		}
	}
}
