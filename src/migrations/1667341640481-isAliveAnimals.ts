import { MigrationInterface, QueryRunner } from "typeorm";

export class isAliveAnimals1667341640481 implements MigrationInterface {
    name = 'isAliveAnimals1667341640481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animals" ADD "isAlive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animals" DROP COLUMN "isAlive"`);
    }

}
