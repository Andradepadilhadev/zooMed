import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Doctors } from "./doctors.entity";
import { Specialities } from "./specialities.entity";

@Entity("doctors_specialities")
export class DoctorsSpecialities {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(() => Doctors)
  doctor: string;

  @ManyToOne(() => Specialities)
  speciality: string;
}
