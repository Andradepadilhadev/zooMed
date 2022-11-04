import { MigrationInterface, QueryRunner } from "typeorm";

export class fixDateAnimals1667600653536 implements MigrationInterface {
    name = 'fixDateAnimals1667600653536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animals" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "animals" ADD "birthDate" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animals" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "animals" ADD "birthDate" TIMESTAMP NOT NULL`);
    }

}
