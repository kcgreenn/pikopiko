import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './reply.entity';
import { ReplyService } from './reply.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reply])],
  providers: [ReplyService],
  exports: [ReplyService],
})
export class ReplyModule {}
