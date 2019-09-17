import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository, InsertResult } from 'typeorm';
import { Post } from '../post/post.entity';
import { pathToFileURL } from 'url';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
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

  async updateProfile(id: string, bio: string): Promise<Profile> {
    try {
      await this.profileRepository
        .createQueryBuilder()
        .update(Profile)
        .set({
          bio,
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
      const index = profile.following.indexOf(handle);
      if (index > -1) {
        profile.following.splice(index, 1);
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

  // Get posts from followed users for feed
  async getFeedPosts(handle: string, skip: number): Promise<Post[]> {
    try {
      const profile = await this.profileRepository
        .createQueryBuilder('profile')
        .where('handle = :handle', { handle })
        .getOne();
      const promises: Promise<Post>[] = await profile.following.map(
        async (item): Promise<Post> => {
          const post = await this.postRepository
            .createQueryBuilder('post')
            .where('post.handle = :handle', { handle: item })
            .leftJoinAndSelect('post.replies', 'replies')
            .orderBy('post.createdDate', 'DESC')
            .skip(skip)
            .getOne();
          return post;
        },
      );
      const feedList = await Promise.all(promises);
      return feedList;
    } catch (err) {
      throw err;
    }
  }
}
