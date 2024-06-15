import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TypeOtpEnum } from '../libs/type-otp.enum';

@Entity('otp')
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 25 })
  email: string;

  @Column({ nullable: false, type: 'enum', enum: TypeOtpEnum })
  typeOtp: TypeOtpEnum;

  @Column({ nullable: false, length: 6 })
  codeOtp: string;

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
}
