import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Reply } from '../reply/reply.entity';

@Entity('Post')
export class Post {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column()
  handle: string;

  @Column({ length: 128 })
  text: string;

  @Column()
  topic: string;

  @Column({ type: 'simple-array' })
  likes: string[];

  @ManyToOne(type => Profile, profile => profile.posts)
  profile: Profile;

  @OneToMany(type => Reply, reply => reply.post)
  replies: Reply[];
}
