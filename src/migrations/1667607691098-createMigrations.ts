import { MigrationInterface, QueryRunner } from "typeorm";

export class createMigrations1667607691098 implements MigrationInterface {
    name = 'createMigrations1667607691098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "doctors_specialities" DROP CONSTRAINT "FK_66970d7bd7c558ef1cb6dd05b06"`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" DROP CONSTRAINT "FK_4cf258623feb0415058ecf4e9bf"`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" DROP CONSTRAINT "FK_04fba043059c7f5ba6462346f10"`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" DROP CONSTRAINT "FK_5c764d1aaa2c7ad2ad41f332b34"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_1be3864ef1ea077611b6aaddc5f"`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" DROP COLUMN "doctorIdId"`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" DROP COLUMN "specialtyIdId"`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" DROP COLUMN "clinicIdId"`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" DROP COLUMN "doctorIdId"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "clinicsDoctorsIdId"`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" ADD "specialityId" uuid`);
        await queryRunner.query(`ALTER TABLE "doctors" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" ADD "clinicId" uuid`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" ADD "doctorId" uuid`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "isCanceled" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "clinicsDoctorsId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "animals" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "animals" ADD "birthDate" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" ADD CONSTRAINT "FK_30c079ac33bb8669929bca5b1e7" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" ADD CONSTRAINT "FK_c019eff4a8e4ebee241711cb20c" FOREIGN KEY ("specialityId") REFERENCES "specialities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" ADD CONSTRAINT "FK_f126bef7a8ca1aa1bbab04aeb05" FOREIGN KEY ("clinicId") REFERENCES "clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" ADD CONSTRAINT "FK_5355422700f40ee9bc43391c990" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_dcc032e477d25d1436855bf4303" FOREIGN KEY ("clinicsDoctorsId") REFERENCES "clinics_doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_dcc032e477d25d1436855bf4303"`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" DROP CONSTRAINT "FK_5355422700f40ee9bc43391c990"`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" DROP CONSTRAINT "FK_f126bef7a8ca1aa1bbab04aeb05"`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" DROP CONSTRAINT "FK_c019eff4a8e4ebee241711cb20c"`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" DROP CONSTRAINT "FK_30c079ac33bb8669929bca5b1e7"`);
        await queryRunner.query(`ALTER TABLE "animals" DROP COLUMN "birthDate"`);
        await queryRunner.query(`ALTER TABLE "animals" ADD "birthDate" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "clinicsDoctorsId"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "isCanceled"`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" DROP COLUMN "clinicId"`);
        await queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" DROP COLUMN "specialityId"`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" DROP COLUMN "doctorId"`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD "clinicsDoctorsIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" ADD "doctorIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" ADD "clinicIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" ADD "specialtyIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" ADD "doctorIdId" uuid`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_1be3864ef1ea077611b6aaddc5f" FOREIGN KEY ("clinicsDoctorsIdId") REFERENCES "clinics_doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" ADD CONSTRAINT "FK_5c764d1aaa2c7ad2ad41f332b34" FOREIGN KEY ("doctorIdId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" ADD CONSTRAINT "FK_04fba043059c7f5ba6462346f10" FOREIGN KEY ("clinicIdId") REFERENCES "clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" ADD CONSTRAINT "FK_4cf258623feb0415058ecf4e9bf" FOREIGN KEY ("specialtyIdId") REFERENCES "specialities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" ADD CONSTRAINT "FK_66970d7bd7c558ef1cb6dd05b06" FOREIGN KEY ("doctorIdId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
