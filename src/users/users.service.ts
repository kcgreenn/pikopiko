import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, InsertResult } from 'typeorm';
import { User } from './users.entity';
import { hash } from 'bcrypt';
import { v4 } from 'uuid';

import { Profile } from '../profile/profile.entity';
import { ProfileService } from '../profile/profile.service';
import { Reply } from '../reply/reply.entity';
import { Post } from '../post/post.entity';

export type User = any;

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@Inject(forwardRef(() => ProfileService))
		private readonly profileService: ProfileService,
	) {}

	// Return total users in db
	countUsers = (): Promise<number> => {
		return this.userRepository.count();
	}

	// Return username with profile and all posts
	async findOneByEmail(email: string): Promise<User> {
		try {
			console.log('email?>');
			const user = await this.userRepository
				.createQueryBuilder('user')
				.where('user.email = :email', { email })
				.leftJoinAndSelect('user.profile', 'profile')
				.leftJoinAndSelect('user.posts', 'posts')
				.getOne();
			console.log(user);
			return user;
		} catch (err) {
			throw err;
		}
	}

	// Return userId
	async findOneById(id: string): Promise<User | undefined> {
		try {
			return await this.userRepository.findOne(id);
		} catch (err) {
			throw err;
		}
	}

	// Create new user and empty profile
	async create({ handle, email, password }): Promise<InsertResult | null> {
		try {
			// Generate uuid for userId
			const id: string = v4();
			// Hash password before saving to db
			const hashedPassword = await hash(password, 12);

			const user = await this.userRepository
				.createQueryBuilder('users')
				.insert()
				.into(User)
				.values([
					{
						id,
						email,
						password: hashedPassword,
					},
				])
				.execute();
			// Create empty profile for user
			await this.profileService.createProfile(id, handle);

			await this.userRepository
				.createQueryBuilder()
				.select()
				.relation(User, 'profile')
				.of({ id })
				.set(id);
			return user;
		} catch (err) {
			throw err;
		}
	}

	// Delete user with given id
	async delete({ userId }): Promise<{ message: string }> {
		try {
			await this.userRepository
				.createQueryBuilder('users')
				.delete()
				.from(User)
				.where('id = :id', { id: userId })
				.execute();
			// Delete user's profile
			await this.profileService.deleteProfile(userId);
			return { message: 'User Deleted' };
		} catch (err) {
			throw err;
		}
	}
}
