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
import { Profile } from '../profile/profile.entity';

@Entity('Post')
export class Post {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	handle: string;

	@ManyToOne((type) => Profile, (profile) => profile.posts)
	@JoinColumn()
	profile: Profile;

	@Column({ length: 248 })
	text: string;

	@Column({ type: 'simple-array' })
	likes: string[];

	@OneToMany((type) => Reply, (reply) => reply.post)
	replies: Reply[];

	@CreateDateColumn()
	createdDate: Date;
}
