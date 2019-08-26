import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, InsertResult } from 'typeorm';
import { User } from './users.entity';
import { hash } from 'bcrypt';
import { Length, IsString } from 'class-validator';

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

	// Return username with profile and all posts
	async findOneByName(name: string): Promise<User | undefined> {
		try {
			return await this.userRepository
				.createQueryBuilder('user')
				.where('user.name = :name', { name })
				.leftJoinAndSelect('user.profile', 'profile')
				.leftJoinAndSelect('user.posts', 'posts')
				.getOne();
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
	async create(body): Promise<{ message: string }> {
		try {
			const { name, email, password } = body;
			// Check if name or email are already in use
			const taken = await this.userRepository
				.createQueryBuilder('user')
				.where('user.name = :name OR user.email = :email', {
					name,
					email,
				})
				.getOne();
			if (taken) {
				throw { message: 'Username or email already registered' };
			}

			// Hash password before saving to db
			const hashedPassword = await hash(password, 12);

			// Create empty profile for user
			const profile = await this.profileService.createProfile();
			await this.userRepository
				.createQueryBuilder('users')
				.insert()
				.into(User)
				.values([
					{
						name,
						email,
						password: hashedPassword,
						posts: [],
						profile: profile.identifiers[0].id,
					},
				])
				.execute();
			return { message: 'User Created' };
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
