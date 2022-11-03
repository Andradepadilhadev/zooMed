import { MigrationInterface, QueryRunner } from "typeorm";

export class fixAppointmentsBug1667508265191 implements MigrationInterface {
    name = 'fixAppointmentsBug1667508265191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "isCanceled" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "animals" ADD "isAlive" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animals" DROP COLUMN "isAlive"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "isCanceled"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "isActive"`);
    }

}
