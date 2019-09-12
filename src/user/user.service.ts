import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, DeleteResult } from 'typeorm';
import { v4 } from 'uuid';
import { hash, compare } from 'bcrypt';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly profileService: ProfileService,
  ) {}

  async userCount(): Promise<number> {
    return await this.userRepository.count();
  }
  async findByEmail(email): Promise<User> {
    try {
      return await this.userRepository.findOne({ email });
    } catch (err) {
      throw err;
    }
  }
  async findByHandle(handle): Promise<User> {
    try {
      return await this.userRepository.findOne({ handle });
    } catch (err) {
      throw err;
    }
  }

  async createUser({ handle, email, password }): Promise<void> {
    try {
      // Check if email is already registered
      const emailIsTaken = await this.findByEmail(email);
      if (emailIsTaken) {
        throw new HttpException(
          `${email} is already registered on this site.`,
          HttpStatus.CONFLICT,
        );
      } else {
        //   generate uuid for user id
        const id = v4();
        // Create profile for new user
        await this.profileService.createProfile(id, handle);
        // Hash password before saving to db
        const hashedPassword = await hash(password, 12);
        //   Save User to db
        await this.userRepository
          .createQueryBuilder()
          .insert()
          .into(User)
          .values({
            id,
            handle,
            email,
            password: hashedPassword,
            profile: id,
          })
          .execute();
      }
    } catch (err) {
      throw err;
    }
  }

  //   Delete user with id
  async deleteUser(id: string, password: string): Promise<DeleteResult> {
    try {
      // Require password to delete
      const userToDelete = await this.userRepository.findOne(id);
      if (compare(password, userToDelete.password)) {
        // delete user
        return await this.userRepository
          .createQueryBuilder()
          .delete()
          .from(User)
          .where('id = :id', { id })
          .execute();
      }
    } catch (err) {
      throw err;
    }
  }
}
