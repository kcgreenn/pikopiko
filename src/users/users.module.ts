import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { ProfileService } from '../profile/profile.service';
import { ProfileModule } from '../profile/profile.module';
import { Profile } from '../profile/profile.entity';
import { PostModule } from '../post/post.module';
import { Post } from '../post/post.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Profile, Post]),
		forwardRef(() => ProfileModule),
		forwardRef(() => PostModule),
		Profile,
		Post,
	],
	providers: [UsersService, ProfileService],
	exports: [UsersService],
})
export class UsersModule {
	constructor(private readonly usersService: UsersService) {}
}
