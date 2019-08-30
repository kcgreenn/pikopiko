import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository, InsertResult } from 'typeorm';
import { Post } from '../post/post.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async getProfileById(id: string): Promise<Profile> {
    try {
      return await this.profileRepository.findOne({ id });
    } catch (err) {
      throw err;
    }
  }

  async getProfileByHandle(handle: string): Promise<Profile> {
    try {
      return await this.profileRepository.findOne({ handle });
    } catch (err) {
      throw err;
    }
  }

  async createProfile(id: string, handle: string): Promise<InsertResult> {
    try {
      //   Check if handle is taken
      const handleIsTaken = await this.getProfileByHandle(handle);
      if (handleIsTaken) {
        throw new HttpException(
          `${handle} is already in use, please choose a different handle.`,
          HttpStatus.CONFLICT,
        );
      }
      return await this.profileRepository
        .createQueryBuilder()
        .insert()
        .into(Profile)
        .values([
          {
            id,
            handle,
            bio: '',
            interests: [],
            following: [],
          },
        ])
        .execute();
    } catch (err) {
      throw err;
    }
  }

  async updateProfile(
    id: string,
    bio: string,
    interests: string,
  ): Promise<Profile> {
    try {
      // Split interests csv into array
      const interestsArray: string[] = interests.split(',');
      await this.profileRepository
        .createQueryBuilder()
        .update(Profile)
        .set({
          bio,
          interests: interestsArray,
        })
        .where('id = :id', { id })
        .execute();
      return await this.profileRepository
        .createQueryBuilder()
        .where('id = :id', { id })
        .getOne();
    } catch (err) {
      throw err;
    }
  }

  async followUser(id: string, handle: string): Promise<Profile> {
    try {
      const profile = await this.profileRepository.findOne(id);
      // Check if user is already following other user
      if (profile.following.some(item => item === handle)) {
        throw new HttpException(
          'Already following that user.',
          HttpStatus.CONFLICT,
        );
      } else {
        profile.following.push(handle);
        return await this.profileRepository.save(profile);
      }
    } catch (err) {
      throw err;
    }
  }

  // Save new post to porfile
  async savePostToProfile(id: string, post: Post): Promise<void> {
    try {
      await this.profileRepository
        .createQueryBuilder()
        .relation(Profile, 'posts')
        .of(id)
        .add(post);
    } catch (err) {
      throw err;
    }
  }

  // Get all of user's posts
  async getUsersPosts(id: string, skip = 0, take = 10): Promise<Profile> {
    return await this.profileRepository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.posts', 'post')
      .skip(skip)
      .take(take)
      .getOne();
  }
}
