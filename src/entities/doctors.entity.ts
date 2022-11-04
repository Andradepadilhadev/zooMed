import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ClinicsDoctors } from "./clinicsDoctors.entity";
import { DoctorsSpecialities } from "./doctorsSpecialities.entity";

@Entity("doctors")
export class Doctors {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 150 })
  email: string;

  @Exclude()
  @Column({ length: 200 })
  password: string;

  @Column({ type: "date" })
  birthDate: Date;

  @Column({ length: 6, unique: true })
  crmv: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => DoctorsSpecialities,
    (doctorsSpecialities) => doctorsSpecialities.doctor
  )
  @JoinColumn()
  doctorSpecialities: DoctorsSpecialities[];

  @OneToMany(() => ClinicsDoctors, (clinicsDoctors) => clinicsDoctors.doctor)
  @JoinColumn()
  clinicsDoctors: ClinicsDoctors[];
}
