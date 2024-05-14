import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Rank } from 'src/common/rank.enum';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Rank, default: Rank.Bronze })
  rank: Rank;

  @Column({ nullable: true })
  image?: string;

  @CreateDateColumn({ type: 'date' })
  createdAt: Date;
}
