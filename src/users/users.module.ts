import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { ProfileService } from '../profile/profile.service';
import { ProfileModule } from '../profile/profile.module';
import { Profile } from '../profile/profile.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([User, Profile]),
		forwardRef(() => ProfileModule),
		Profile,
	],
	providers: [UsersService, ProfileService],
	exports: [UsersService],
})
export class UsersModule {
	constructor(private readonly usersService: UsersService) {}
}
