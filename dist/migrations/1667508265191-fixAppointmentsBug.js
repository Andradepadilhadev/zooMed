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
exports.fixAppointmentsBug1667508265191 = void 0;
class fixAppointmentsBug1667508265191 {
    constructor() {
        this.name = 'fixAppointmentsBug1667508265191';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "doctors" ADD "isActive" boolean NOT NULL DEFAULT true`);
            yield queryRunner.query(`ALTER TABLE "appointments" ADD "isCanceled" boolean NOT NULL DEFAULT false`);
            yield queryRunner.query(`ALTER TABLE "users" ADD "isActive" boolean NOT NULL DEFAULT true`);
            yield queryRunner.query(`ALTER TABLE "animals" ADD "isAlive" boolean NOT NULL DEFAULT true`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "animals" DROP COLUMN "isAlive"`);
            yield queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isActive"`);
            yield queryRunner.query(`ALTER TABLE "appointments" DROP COLUMN "isCanceled"`);
            yield queryRunner.query(`ALTER TABLE "doctors" DROP COLUMN "isActive"`);
        });
    }
}
exports.fixAppointmentsBug1667508265191 = fixAppointmentsBug1667508265191;
