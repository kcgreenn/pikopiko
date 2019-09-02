import {
	PrimaryGeneratedColumn,
	Column,
	Entity,
	CreateDateColumn,
	Unique,
	OneToOne,
	JoinColumn,
	OneToMany,
	PrimaryColumn,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';
import { Post } from '../post/post.entity';
import { Reply } from '../reply/reply.entity';

@Entity('User')
export class User {
	@PrimaryColumn({
		unique: true,
		type: 'uuid',
	})
	id: string;

	@Column({
		unique: true,
	})
	email: string;

	@Column({
		length: 128,
	})
	password: string;

	@OneToOne((type) => Profile)
	@JoinColumn()
	profile: Profile;

	@CreateDateColumn()
	createdDate: Date;
}
