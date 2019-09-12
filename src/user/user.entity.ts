import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from '../profile/profile.entity';

@Entity('User')
export class User {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, length: 64 })
  handle: string;

  @Column({ length: 256 })
  password: string;

  @CreateDateColumn()
  createdDate: Date;

  @OneToOne(type => Profile, { cascade: true })
  @JoinColumn()
  profile: Profile;
}
