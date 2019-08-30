import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { ProfileModule } from '../profile/profile.module';
import { ReplyModule } from '../reply/reply.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), ProfileModule, ReplyModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
