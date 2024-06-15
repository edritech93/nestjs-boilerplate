import { Attachment } from 'src/attachment/entities/attachment.entity';
import { DeviceToken } from 'src/device-token/entities/device-token.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('userAuth')
export class UserAuth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 25 })
  email: string;

  @Column({ nullable: false })
  password: string;

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

  @OneToOne(() => Profile, (e) => e.user)
  profile: Profile;

  @OneToMany(() => Attachment, (e) => e.user)
  attachment: Attachment[];

  @OneToMany(() => DeviceToken, (e) => e.user)
  deviceToken: DeviceToken[];
}
