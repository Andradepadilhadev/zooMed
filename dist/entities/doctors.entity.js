"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctors = void 0;
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const clinicsDoctors_entity_1 = require("./clinicsDoctors.entity");
const doctorsSpecialities_entity_1 = require("./doctorsSpecialities.entity");
let Doctors = class Doctors {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Doctors.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Doctors.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], Doctors.prototype, "email", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Doctors.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Doctors.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 6, unique: true }),
    __metadata("design:type", String)
], Doctors.prototype, "crmv", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Doctors.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Doctors.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Doctors.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => doctorsSpecialities_entity_1.DoctorsSpecialities, (doctorsSpecialities) => doctorsSpecialities.doctorId),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Doctors.prototype, "doctorSpecialities", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => clinicsDoctors_entity_1.ClinicsDoctors, (clinicsDoctors) => clinicsDoctors.doctorId),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Doctors.prototype, "clinicsDoctors", void 0);
Doctors = __decorate([
    (0, typeorm_1.Entity)("doctors")
], Doctors);
exports.Doctors = Doctors;
