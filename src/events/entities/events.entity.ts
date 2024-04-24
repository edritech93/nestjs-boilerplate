import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('events')
export class Events {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 30 })
  eventName: string;

  @Column({ nullable: false, type: 'text' })
  eventDescription: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
