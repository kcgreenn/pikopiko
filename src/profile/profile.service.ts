import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository, InsertResult } from 'typeorm';
import { Post } from '../post/post.entity';

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(Profile)
		private readonly profileRepository: Repository<Profile>,
		@InjectRepository(Post)
		private readonly postRepository: Repository<Post>,
	) {}

	// Return profile of given id
	async getProfile({ userId }): Promise<Profile> {
		try {
			return await this.profileRepository
				.createQueryBuilder('profile')
				.where('profile.id = :id', { id: userId })
				.getOne();
		} catch (err) {
			throw err;
		}
	}

	// Return profile of given id
	async getProfileByHandle({ handle }): Promise<Profile> {
		try {
			return await this.profileRepository
				.createQueryBuilder('profile')
				.where('profile.handle = :handle', { handle })
				.getOne();
		} catch (err) {
			throw err;
		}
	}

	// Create A User Profile
	async createProfile(id: string, handle: string): Promise<InsertResult> {
		try {
			const profile = await this.profileRepository
				.createQueryBuilder()
				.insert()
				.into(Profile)
				.values([{ id, handle, bio: '', interests: [], following: [] }])
				.execute();
			return profile;
		} catch (err) {
			throw err;
		}
	}

	// Update Profile Information
	async updateProfile(
		{ userId },
		{ bio, interests },
	): Promise<{ message: string }> {
		try {
			// Format interests for simple array db type
			interests = interests.split(',');
			// Update user's profile
			await this.profileRepository
				.createQueryBuilder()
				.update(Profile)
				.set({ bio, interests })
				.where('id = :id', { id: userId })
				.execute();
			return { message: 'Updated user\'s profile' };
		} catch (err) {
			throw err;
		}
	}

	// Get user's post feed
	async getFeed(userId: number, skip = 0, take = 1): Promise<any> {
		try {
			// Get list of users being followed
			const profile = await this.profileRepository
				.createQueryBuilder('profile')
				.select('profile.following')
				.where('profile.id = :id', { id: userId })
				.getOne();
			const feedList = [];
			// Get posts from each user, number depending on skip and take for pagination or infinite scrolling
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

	// Follow or Unfollow a user
	async followUser(userId: number, userToFollow: string): Promise<Profile> {
		try {
			const profile = await this.profileRepository.findOne(userId);
			// Unfollow if already following, otherwise follow user
			profile.following.some((item) => (item = userToFollow))
				? profile.following.splice(
						profile.following.indexOf(userToFollow),
						1,
				  )
				: profile.following.push(userToFollow);
			return await this.profileRepository.save(profile);
		} catch (err) {
			throw err;
		}
	}

	// Delete Profile
	async deleteProfile(id: number): Promise<any> {
		try {
			await this.profileRepository
				.createQueryBuilder('profile')
				.delete()
				.from(Profile)
				.where('id = :id', { id })
				.execute();
			return { message: 'Profile Deleted' };
		} catch (err) {
			throw err;
		}
	}
}
