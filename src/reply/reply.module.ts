import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './reply.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Reply])],
	providers: [ReplyService],
})
export class ReplyModule {}
