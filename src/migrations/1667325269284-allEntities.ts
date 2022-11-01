import { MigrationInterface, QueryRunner } from "typeorm";

export class allEntities1667325269284 implements MigrationInterface {
    name = 'allEntities1667325269284'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "zipCode" character varying(8) NOT NULL, "number" character varying(5) NOT NULL, "complement" character varying(100), "district" character varying(100) NOT NULL, "city" character varying(200) NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clinics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "contact" character varying(50) NOT NULL, "crmv_pj" character varying(5), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, CONSTRAINT "UQ_2284ed0e969b3b833f32f8832f9" UNIQUE ("crmv_pj"), CONSTRAINT "REL_84cedd0702508727b620cd75a7" UNIQUE ("addressId"), CONSTRAINT "PK_5513b659e4d12b01a8ab3956abc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "specialities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(80) NOT NULL, CONSTRAINT "PK_bff0e3b630c901aec7557343230" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctors_specialities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "doctorIdId" uuid, "specialtyIdId" uuid, CONSTRAINT "PK_3a5c775e69ac1536debafbd8859" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(200) NOT NULL, "birthDate" date NOT NULL, "crmv" character varying(6) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_bf3483d4ddcf0784c1d5f002f11" UNIQUE ("crmv"), CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clinics_doctors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "clinicIdId" uuid, "doctorIdId" uuid, CONSTRAINT "PK_c05a6638d7bb3eedd0576c0fea3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "hour" TIME NOT NULL, "animalsId" uuid, "clinicsDoctorsIdId" uuid, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "species" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "review" character varying(2000) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "appointmentsId" uuid, CONSTRAINT "REL_a35cb053634a8fed410c7508cf" UNIQUE ("appointmentsId"), CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(200) NOT NULL, "birthDate" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "animals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "birthDate" TIMESTAMP NOT NULL, "breed" character varying(200) NOT NULL, "userId" uuid, "speciesId" uuid, CONSTRAINT "PK_6154c334bbb19186788468bce5c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "clinics" ADD CONSTRAINT "FK_84cedd0702508727b620cd75a76" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" ADD CONSTRAINT "FK_66970d7bd7c558ef1cb6dd05b06" FOREIGN KEY ("doctorIdId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" ADD CONSTRAINT "FK_4cf258623feb0415058ecf4e9bf" FOREIGN KEY ("specialtyIdId") REFERENCES "specialities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" ADD CONSTRAINT "FK_04fba043059c7f5ba6462346f10" FOREIGN KEY ("clinicIdId") REFERENCES "clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" ADD CONSTRAINT "FK_5c764d1aaa2c7ad2ad41f332b34" FOREIGN KEY ("doctorIdId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_bc5bef9b84ffd3fd8cad401b5b0" FOREIGN KEY ("animalsId") REFERENCES "animals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_1be3864ef1ea077611b6aaddc5f" FOREIGN KEY ("clinicsDoctorsIdId") REFERENCES "clinics_doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_a35cb053634a8fed410c7508cfa" FOREIGN KEY ("appointmentsId") REFERENCES "appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_d5b0e9fd87c1b1daf0d88a5012b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_56b2b9a159e8ccaa0ade6cf036c" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_56b2b9a159e8ccaa0ade6cf036c"`);
        await queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_d5b0e9fd87c1b1daf0d88a5012b"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_a35cb053634a8fed410c7508cfa"`);
        await queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_1be3864ef1ea077611b6aaddc5f"`);
        await queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_bc5bef9b84ffd3fd8cad401b5b0"`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" DROP CONSTRAINT "FK_5c764d1aaa2c7ad2ad41f332b34"`);
        await queryRunner.query(`ALTER TABLE "clinics_doctors" DROP CONSTRAINT "FK_04fba043059c7f5ba6462346f10"`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" DROP CONSTRAINT "FK_4cf258623feb0415058ecf4e9bf"`);
        await queryRunner.query(`ALTER TABLE "doctors_specialities" DROP CONSTRAINT "FK_66970d7bd7c558ef1cb6dd05b06"`);
        await queryRunner.query(`ALTER TABLE "clinics" DROP CONSTRAINT "FK_84cedd0702508727b620cd75a76"`);
        await queryRunner.query(`DROP TABLE "animals"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "reviews"`);
        await queryRunner.query(`DROP TABLE "species"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TABLE "clinics_doctors"`);
        await queryRunner.query(`DROP TABLE "doctors"`);
        await queryRunner.query(`DROP TABLE "doctors_specialities"`);
        await queryRunner.query(`DROP TABLE "specialities"`);
        await queryRunner.query(`DROP TABLE "clinics"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
