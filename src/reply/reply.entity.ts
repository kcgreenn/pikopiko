import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Post } from '../post/post.entity';

@Entity('Reply')
export class Reply {
  @PrimaryGeneratedColumn()
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @Column()
  handle: string;

  @Column({ length: 256 })
  text: string;

  @ManyToOne(type => Post, post => post.replies)
  post: Post;
}
