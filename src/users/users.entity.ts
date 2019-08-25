import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	Unique,
	OneToOne,
	JoinColumn,
	OneToMany,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Post } from '../post/post.entity';
import { Reply } from '../reply/reply.entity';

@Entity('User')
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		length: 64,
		unique: true,
	})
	name: string;

	@Column({
		unique: true,
	})
	email: string;

	@Column({
		length: 64,
	})
	password: string;

	@OneToOne((type) => Profile)
	@JoinColumn()
	profile: Profile;

	@OneToMany((type) => Post, (post) => post.user)
	posts: Post[];

	@CreateDateColumn()
	createdDate: Date;
}
