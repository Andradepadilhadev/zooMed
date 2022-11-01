import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Animals } from "./animals.entity";
import { Reviews } from "./reviews.entity";

@Entity("appointments")
export class Appointments {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @ManyToOne(() => Animals)
  animals: Animals;

  @OneToOne(() => Reviews)
  reviews: Reviews;
}
