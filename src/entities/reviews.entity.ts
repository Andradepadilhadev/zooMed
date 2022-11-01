import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Users } from "./users.entity";

@Entity("reviews")
export class Reviews {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 2000 })
  review: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Users)
  user: Users;
}
