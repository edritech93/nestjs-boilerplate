import { Profile } from 'src/profile/entities/profile.entity';
import { UserAuth } from 'src/user-auth/entities/user-auth.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('attachment')
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  fileName: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false })
  path: string;

  @Column({
    type: 'timestamp',
    default: () => 'NOW()',
  })
  createdAt: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    onUpdate: 'NOW()',
  })
  updatedAt: string;

  @ManyToOne(() => UserAuth, (e) => e.attachment, { onUpdate: 'CASCADE' })
  @JoinColumn()
  user: UserAuth;

  @Column()
  userId: number;

  @OneToOne(() => Profile, (e) => e.attachment)
  profile: number;
}
