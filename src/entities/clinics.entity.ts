import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Address } from "./address.entity";
import { ClinicsDoctors } from "./clinicsDoctors.entity";

@Entity("clinics")
export class Clinics {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 200 })
  name: string;

  @Column({ length: 50 })
  contact: string;

  @Column({ length: 5, unique: true, nullable: true })
  crmv_pj: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @OneToMany(() => ClinicsDoctors, (clinicsDoctors) => clinicsDoctors.clinicId)
  @JoinColumn()
  clinicsDoctors: ClinicsDoctors[];
}
