import {
	Entity,
	PrimaryColumn,
	Column,
	OneToOne,
	JoinColumn,
	CreateDateColumn,
	OneToMany,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Post } from '../post/post.entity';

export interface Following {
	username: string;
	userid: string;
}

@Entity('Profile')
export class Profile {
	@PrimaryColumn({
		type: 'uuid',
	})
	id: string;

	@Column({ unique: true })
	handle: string;

	@Column({ length: 500, nullable: true })
	bio: string;

	@Column({ type: 'simple-array', nullable: true })
	following: string[];

	@Column({ type: 'simple-array', nullable: true })
	interests: string[];

	@OneToOne((type) => User, (user) => user.profile, {
		cascade: true,
		onDelete: 'CASCADE',
	})
	user: User;

	@OneToMany((type) => Post, (post) => post.profile)
	posts: Post[];

	@CreateDateColumn()
	createdDate: Date;
}
