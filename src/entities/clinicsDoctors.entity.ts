import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointments } from "./appointments.entity";
import { Clinics } from "./clinics.entity";
import { Doctors } from "./doctors.entity";

@Entity("clinics_doctors")
export class ClinicsDoctors {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @ManyToOne(() => Clinics)
  clinic: Clinics;

  @ManyToOne(() => Doctors)
  doctor: Doctors;

  @OneToMany(() => Appointments, (appointments) => appointments.clinicsDoctors)
  appointments: Appointments[];
}
