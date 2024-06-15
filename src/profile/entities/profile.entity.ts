import { Attachment } from 'src/attachment/entities/attachment.entity';
import { UserAuth } from 'src/user-auth/entities/user-auth.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 20 })
  fullName: string;

  @Column({ type: 'timestamp', nullable: false })
  dateOfBirth: string;

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

  @OneToOne(() => UserAuth, (e) => e.profile)
  @JoinColumn()
  user: UserAuth;

  @Column()
  userId: number;

  @OneToOne(() => Attachment, (e) => e.profile, { onUpdate: 'CASCADE' })
  @JoinColumn()
  attachment: Attachment;

  @Column({ nullable: true })
  attachmentId: number;
}
