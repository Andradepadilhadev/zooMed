import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Appointments } from "./appointments.entity";
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
  @JoinColumn()
  user: Users;

  @OneToOne(() => Appointments)
  @JoinColumn()
  appointments: Appointments;
}
