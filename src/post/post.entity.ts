import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	OneToMany,
	JoinColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Reply } from '../reply/reply.entity';

@Entity('Post')
export class Post {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@ManyToOne((type) => User, (user) => user.posts)
	@JoinColumn()
	user: User;

	@Column({ length: 248 })
	text: string;

	@Column({ type: 'simple-array' })
	likes: string[];

	@OneToMany((type) => Reply, (reply) => reply.post)
	replies: Reply[];

	@CreateDateColumn()
	createdDate: Date;
}
