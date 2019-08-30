import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reply } from './reply.entity';
import { Repository, InsertResult } from 'typeorm';
import { Post } from '../post/post.entity';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private readonly replyRepository: Repository<Reply>,
  ) {}

  //   Create Reply
  async createReply(post: Post, text: string, handle: string): Promise<Reply> {
    try {
      const insertResult: InsertResult = await this.replyRepository
        .createQueryBuilder()
        .insert()
        .into(Reply)
        .values([
          {
            text,
            handle,
            post,
          },
        ])
        .execute();
      return this.replyRepository.findOne({
        id: insertResult.identifiers[0].id,
      });
    } catch (err) {
      throw err;
    }
  }
}
