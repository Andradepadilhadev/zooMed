import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("address")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 8 })
  zipCode: string;

  @Column({ length: 5 })
  number: string;

  @Column({ length: 100, nullable: true })
  complement: string;

  @Column({ length: 100 })
  district: string;

  @Column({ length: 200 })
  city: string;

  @Column({ length: 2 })
  state: string;
}
