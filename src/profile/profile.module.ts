import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Reply } from '../reply/reply.entity';
import { ReplyModule } from '../reply/reply.module';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, Reply]), ReplyModule],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
