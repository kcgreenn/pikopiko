import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { User } from '../users/users.entity';
import { PostModule } from '../post/post.module';
import { Post } from '../post/post.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Profile, User, Post]),
		forwardRef(() => UsersModule),
		forwardRef(() => PostModule),
		Post,
	],
	controllers: [ProfileController],
	providers: [ProfileService, UsersService],
	exports: [ProfileService],
})
export class ProfileModule {
	constructor(private readonly profileService: ProfileService) {}
}
