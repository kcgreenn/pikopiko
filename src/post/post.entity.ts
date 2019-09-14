import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinTable,
  OneToMany,
  JoinColumn,
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

  @Column({ length: 512 })
  text: string;

  @Column()
  topic: string;

  @Column({ type: 'simple-array' })
  likes: string[];

  @ManyToOne(type => Profile, profile => profile.posts)
  @JoinColumn()
  profile: Profile;

  @OneToMany(type => Reply, reply => reply.post)
  @JoinColumn()
  replies: Reply[];
}
