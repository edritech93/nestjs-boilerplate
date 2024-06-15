import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TypeDeviceEnum } from '../libs/type-device.enum';
import { UserAuth } from 'src/user-auth/entities/user-auth.entity';

@Entity('deviceToken')
export class DeviceToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'text' })
  token: string;

  @Column({ nullable: false, type: 'enum', enum: TypeDeviceEnum })
  deviceType: TypeDeviceEnum;

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

  @ManyToOne(() => UserAuth, (e) => e.deviceToken, { onUpdate: 'CASCADE' })
  @JoinColumn()
  user: UserAuth;

  @Column()
  userId: number;
}
