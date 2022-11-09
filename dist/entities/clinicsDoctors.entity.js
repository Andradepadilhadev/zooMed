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
exports.ClinicsDoctors = void 0;
const typeorm_1 = require("typeorm");
const appointments_entity_1 = require("./appointments.entity");
const clinics_entity_1 = require("./clinics.entity");
const doctors_entity_1 = require("./doctors.entity");
let ClinicsDoctors = class ClinicsDoctors {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], ClinicsDoctors.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clinics_entity_1.Clinics),
    __metadata("design:type", clinics_entity_1.Clinics)
], ClinicsDoctors.prototype, "clinic", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => doctors_entity_1.Doctors),
    __metadata("design:type", doctors_entity_1.Doctors)
], ClinicsDoctors.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointments_entity_1.Appointments, (appointments) => appointments.clinicsDoctors),
    __metadata("design:type", Array)
], ClinicsDoctors.prototype, "appointments", void 0);
ClinicsDoctors = __decorate([
    (0, typeorm_1.Entity)("clinics_doctors")
], ClinicsDoctors);
exports.ClinicsDoctors = ClinicsDoctors;
