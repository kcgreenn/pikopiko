import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Post } from '../post/post.entity';

@Entity('Reply')
export class Reply {
	@PrimaryGeneratedColumn()
	id: string;

	@ManyToOne((type) => Post, (post) => post.replies)
	post: Post;

	@Column()
	username: string;

	@Column({ length: 248 })
	text: string;

	@CreateDateColumn()
	createdDate: Date;
}
