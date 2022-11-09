"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTables1667997436865 = void 0;
class updateTables1667997436865 {
    constructor() {
        this.name = 'updateTables1667997436865';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "zipCode" character varying(8) NOT NULL, "number" character varying(5) NOT NULL, "complement" character varying(100), "district" character varying(100) NOT NULL, "city" character varying(200) NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "species" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "PK_ae6a87f2423ba6c25dc43c32770" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "review" character varying(2000) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, "appointmentsId" uuid, CONSTRAINT "REL_a35cb053634a8fed410c7508cf" UNIQUE ("appointmentsId"), CONSTRAINT "PK_231ae565c273ee700b283f15c1d" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(150) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "password" character varying(200) NOT NULL, "birthDate" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "animals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "birthDate" date NOT NULL, "breed" character varying(200) NOT NULL, "isAlive" boolean NOT NULL DEFAULT true, "userId" uuid, "speciesId" uuid, CONSTRAINT "PK_6154c334bbb19186788468bce5c" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "clinics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "contact" character varying(50) NOT NULL, "crmv_pj" character varying(5), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "addressId" uuid, CONSTRAINT "UQ_2284ed0e969b3b833f32f8832f9" UNIQUE ("crmv_pj"), CONSTRAINT "REL_84cedd0702508727b620cd75a7" UNIQUE ("addressId"), CONSTRAINT "PK_5513b659e4d12b01a8ab3956abc" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "specialities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(80) NOT NULL, CONSTRAINT "PK_bff0e3b630c901aec7557343230" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "doctors_specialities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "doctorId" uuid, "specialityId" uuid, CONSTRAINT "PK_3a5c775e69ac1536debafbd8859" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "doctors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(200) NOT NULL, "birthDate" date NOT NULL, "crmv" character varying(6) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_bf3483d4ddcf0784c1d5f002f11" UNIQUE ("crmv"), CONSTRAINT "PK_8207e7889b50ee3695c2b8154ff" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "clinics_doctors" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "clinicId" uuid, "doctorId" uuid, CONSTRAINT "PK_c05a6638d7bb3eedd0576c0fea3" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "appointments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" date NOT NULL, "hour" TIME NOT NULL, "isCanceled" boolean NOT NULL DEFAULT false, "animalsId" uuid, "clinicsDoctorsId" uuid, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "reviews" ADD CONSTRAINT "FK_a35cb053634a8fed410c7508cfa" FOREIGN KEY ("appointmentsId") REFERENCES "appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_d5b0e9fd87c1b1daf0d88a5012b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "animals" ADD CONSTRAINT "FK_56b2b9a159e8ccaa0ade6cf036c" FOREIGN KEY ("speciesId") REFERENCES "species"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "clinics" ADD CONSTRAINT "FK_84cedd0702508727b620cd75a76" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "doctors_specialities" ADD CONSTRAINT "FK_30c079ac33bb8669929bca5b1e7" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "doctors_specialities" ADD CONSTRAINT "FK_c019eff4a8e4ebee241711cb20c" FOREIGN KEY ("specialityId") REFERENCES "specialities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "clinics_doctors" ADD CONSTRAINT "FK_f126bef7a8ca1aa1bbab04aeb05" FOREIGN KEY ("clinicId") REFERENCES "clinics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "clinics_doctors" ADD CONSTRAINT "FK_5355422700f40ee9bc43391c990" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_bc5bef9b84ffd3fd8cad401b5b0" FOREIGN KEY ("animalsId") REFERENCES "animals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "appointments" ADD CONSTRAINT "FK_dcc032e477d25d1436855bf4303" FOREIGN KEY ("clinicsDoctorsId") REFERENCES "clinics_doctors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_dcc032e477d25d1436855bf4303"`);
            yield queryRunner.query(`ALTER TABLE "appointments" DROP CONSTRAINT "FK_bc5bef9b84ffd3fd8cad401b5b0"`);
            yield queryRunner.query(`ALTER TABLE "clinics_doctors" DROP CONSTRAINT "FK_5355422700f40ee9bc43391c990"`);
            yield queryRunner.query(`ALTER TABLE "clinics_doctors" DROP CONSTRAINT "FK_f126bef7a8ca1aa1bbab04aeb05"`);
            yield queryRunner.query(`ALTER TABLE "doctors_specialities" DROP CONSTRAINT "FK_c019eff4a8e4ebee241711cb20c"`);
            yield queryRunner.query(`ALTER TABLE "doctors_specialities" DROP CONSTRAINT "FK_30c079ac33bb8669929bca5b1e7"`);
            yield queryRunner.query(`ALTER TABLE "clinics" DROP CONSTRAINT "FK_84cedd0702508727b620cd75a76"`);
            yield queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_56b2b9a159e8ccaa0ade6cf036c"`);
            yield queryRunner.query(`ALTER TABLE "animals" DROP CONSTRAINT "FK_d5b0e9fd87c1b1daf0d88a5012b"`);
            yield queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_a35cb053634a8fed410c7508cfa"`);
            yield queryRunner.query(`ALTER TABLE "reviews" DROP CONSTRAINT "FK_7ed5659e7139fc8bc039198cc1f"`);
            yield queryRunner.query(`DROP TABLE "appointments"`);
            yield queryRunner.query(`DROP TABLE "clinics_doctors"`);
            yield queryRunner.query(`DROP TABLE "doctors"`);
            yield queryRunner.query(`DROP TABLE "doctors_specialities"`);
            yield queryRunner.query(`DROP TABLE "specialities"`);
            yield queryRunner.query(`DROP TABLE "clinics"`);
            yield queryRunner.query(`DROP TABLE "animals"`);
            yield queryRunner.query(`DROP TABLE "users"`);
            yield queryRunner.query(`DROP TABLE "reviews"`);
            yield queryRunner.query(`DROP TABLE "species"`);
            yield queryRunner.query(`DROP TABLE "address"`);
        });
    }
}
exports.updateTables1667997436865 = updateTables1667997436865;
