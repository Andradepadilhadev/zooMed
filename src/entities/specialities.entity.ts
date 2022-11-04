import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DoctorsSpecialities } from "./doctorsSpecialities.entity";

@Entity("specialities")
export class Specialities {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 80 })
  name: string;

  @OneToMany(
    () => DoctorsSpecialities,
    (doctorsSpecialities) => doctorsSpecialities.speciality
  )
  doctorSpecialities: DoctorsSpecialities[];
}
