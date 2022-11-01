import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Appointments } from "./appointments.entity";
import { Species } from "./species.entity";
import { Users } from "./users.entity";

@Entity("animals")
export class Animals {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @Column()
  birthDate: Date;

  @Column({ length: 200 })
  breed: string;

  @ManyToOne(() => Users)
  user: Users;

  @ManyToOne(() => Species)
  species: Species;

  @OneToMany(() => Appointments, (appointments) => appointments.animals)
  appointments: Appointments[];
}
