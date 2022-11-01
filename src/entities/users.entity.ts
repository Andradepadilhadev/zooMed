import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Animals } from "./animals.entity";
import { Reviews } from "./reviews.entity";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 150 })
  email: string;

  @Exclude()
  @Column({ length: 200 })
  password: string;

  @Column()
  birthDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Animals, (animals) => animals.user)
  animals: Animals[];

  @OneToMany(() => Reviews, (reviews) => reviews.user)
  reviews: Reviews[];

}
