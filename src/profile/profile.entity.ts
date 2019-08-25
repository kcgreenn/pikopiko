import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
	CreateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

export interface Following {
	username: string;
	userid: string;
}

@Entity('Profile')
export class Profile {
	@PrimaryGeneratedColumn()
	id: number;

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

	@CreateDateColumn()
	createdDate: Date;
}
