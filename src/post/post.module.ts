import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UsersModule } from '../users/users.module';
import { ReplyModule } from '../reply/reply.module';
import { User } from '../users/users.entity';
import { ReplyService } from '../reply/reply.service';
import { Reply } from '../reply/reply.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Post, Reply]),
		forwardRef(() => UsersModule),
		ReplyModule,
	],
	controllers: [PostController],
	providers: [PostService, ReplyService],
})
export class PostModule {}
