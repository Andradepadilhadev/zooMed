import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Animals } from "./animals.entity";
import { ClinicsDoctors } from "./clinicsDoctors.entity";

@Entity("appointments")
export class Appointments {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "time" })
  hour: string;

  @Column({ default: false })
  isCanceled: boolean;

  @ManyToOne(() => Animals)
  @JoinColumn()
  animals: Animals;

  @ManyToOne(() => ClinicsDoctors)
  @JoinColumn()
  clinicsDoctorsId: string;
}
