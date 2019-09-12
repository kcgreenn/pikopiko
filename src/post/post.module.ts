import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostService } from './post.service';
import { ProfileModule } from '../profile/profile.module';
import { ReplyModule } from '../reply/reply.module';
import { Reply } from '../reply/reply.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Reply]),
    ProfileModule,
    ReplyModule,
    ReplyModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
