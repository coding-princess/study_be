import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { Rank } from 'src/common/rank.enum';
import * as bcrypt from 'bcrypt';

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

  @Column({ nullable: true })
  token?: string;

  @BeforeInsert()
  private beforeInsert() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
