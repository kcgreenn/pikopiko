import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

	async findAll(): Promise<User[]> {
		try {
			return await this.userRepository
				.createQueryBuilder('User')
				.limit(10)
				.getMany();
		} catch (err) {
			throw err;
		}
	}

	async findOneByName(name: string): Promise<User | undefined> {
		try {
			return await this.userRepository
				.createQueryBuilder('user')
				.where('user.name = :name', { name })
				.leftJoinAndSelect('user.profile', 'profile')
				.leftJoinAndSelect('user.posts', 'posts')
				.getOne();
			// return await this.userRepository.findOne({ name });
		} catch (err) {
			throw err;
		}
	}

	async findOneById(id: string): Promise<User | undefined> {
		try {
			return await this.userRepository.findOne(id);
		} catch (err) {
			throw err;
		}
	}

	async findOneByEmail(email: string): Promise<User | undefined> {
		try {
			return await this.userRepository.findOne({ email });
		} catch (err) {
			throw err;
		}
	}

	async create({ name, email, password }): Promise<User | string> {
		try {
			// Check if name or email are already in use
			if (await this.findOneByName(name)) {
				return 'Username is already in use';
			}
			if (await this.findOneByEmail(email)) {
				return 'Email is already in use';
			}

			// Hash password before saving to db
			const hashedPassword = await hash(password, 12);

			// Create empty profile
			const profile = await this.profileService.createProfile();
			// Create new user
			const newUser = new User();
			newUser.name = name;
			newUser.email = email;
			newUser.password = hashedPassword;
			newUser.posts = [];
			newUser.profile = profile;
			return await this.userRepository.save(newUser);
		} catch (err) {
			throw err;
		}
	}

	async delete({ userId }): Promise<User> {
		try {
			const userToRemove = await this.userRepository.findOne(userId);
			await this.userRepository.remove(userToRemove);
			await this.profileService.deleteProfile(userId);
			return userToRemove;
		} catch (err) {
			throw err;
		}
	}
}
