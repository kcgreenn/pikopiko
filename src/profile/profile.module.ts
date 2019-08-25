import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { User } from '../users/users.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Profile, User]),
		forwardRef(() => UsersModule),
	],
	controllers: [ProfileController],
	providers: [ProfileService, UsersService],
	exports: [ProfileService],
})
export class ProfileModule {
	constructor(private readonly profileService: ProfileService) {}
}
