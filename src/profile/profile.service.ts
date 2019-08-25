import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { Post } from '../post/post.entity';

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(Profile)
		private readonly profileRepository: Repository<Profile>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		@InjectRepository(Post)
		private readonly postRepository: Repository<Post>,
	) {}

	async getProfile({ userId }): Promise<Profile> {
		try {
			return await this.profileRepository.findOne({ user: userId });
		} catch (err) {
			throw err;
		}
	}

	// Create A User Profile
	async createProfile(): Promise<Profile> {
		try {
			const newProfile = new Profile();
			newProfile.bio = '';
			newProfile.interests = [];
			newProfile.following = [];
			return await this.profileRepository.save(newProfile);
		} catch (err) {
			throw err;
		}
	}

	// Update Profile Information
	async updateProfile(
		{ userId },
		{ bio, interests, following },
	): Promise<Profile> {
		try {
			interests = interests.split(',');
			following = following.split(',');
			const profile = await this.profileRepository.findOne(userId);
			profile.bio = bio;
			profile.following = following;
			profile.interests = interests;
			return await this.profileRepository.save(profile);
		} catch (err) {
			throw err;
		}
	}

	// Get user's post feed
	async getFeed(userId: number, skip = 0, take = 1): Promise<any> {
		try {
			const profile = await this.profileRepository
				.createQueryBuilder('profile')
				.select('profile.following')
				.where('profile.id = :id', { id: userId })
				.getOne();
			const feedList = [];
			for (let i = 0; i < profile.following.length; i++) {
				const post = await this.postRepository
					.createQueryBuilder('post')
					.select('post')
					.where('post.username = :username', {
						username: profile.following[i],
					})
					.orderBy('post.createdDate', 'DESC')
					.skip(skip)
					.take(take)
					.getMany();
				feedList.push(post[0]);
			}
			return feedList;
		} catch (err) {
			throw err;
		}
	}

	// Follow User
	async followUser(userId: number, userToFollow: string): Promise<Profile> {
		try {
			const profile = await this.profileRepository.findOne(userId);
			// Check if already following
			const index = profile.following.indexOf(userToFollow);
			if (index !== -1) {
				profile.following.splice(index, 1);
			} else {
				profile.following.push(userToFollow);
			}
			return await this.profileRepository.save(profile);
		} catch (err) {
			throw err;
		}
	}

	// Delete Profile
	async deleteProfile(userId: number): Promise<any> {
		try {
			const profileToBeRemoved = await this.profileRepository.findOne(
				userId,
			);
			await this.profileRepository.remove(profileToBeRemoved);
			return profileToBeRemoved;
		} catch (err) {
			throw err;
		}
	}
}
