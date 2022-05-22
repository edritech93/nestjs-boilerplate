import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;
}
