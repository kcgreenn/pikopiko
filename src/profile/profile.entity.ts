import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';

@Entity('Profile')
export class Profile {
  @PrimaryColumn({ type: 'uuid', name: 'profileId' })
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column({ unique: true, length: 32 })
  handle: string;

  @Column({ length: 512 })
  bio: string;

  @Column({ type: 'simple-array' })
  interests: string[];

  @Column({ type: 'simple-array' })
  following: string[];

  @OneToMany(type => Post, post => post.profile)
  @JoinColumn()
  posts: Post[];
}
