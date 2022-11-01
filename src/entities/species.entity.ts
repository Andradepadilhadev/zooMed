import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Animals } from "./animals.entity";

@Entity("species")
export class Species {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => Animals, (animals) => animals.species)
  animal: Animals[];
}
