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
exports.Appointments = void 0;
const typeorm_1 = require("typeorm");
const animals_entity_1 = require("./animals.entity");
const clinicsDoctors_entity_1 = require("./clinicsDoctors.entity");
let Appointments = class Appointments {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Appointments.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", String)
], Appointments.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "time" }),
    __metadata("design:type", String)
], Appointments.prototype, "hour", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Appointments.prototype, "isCanceled", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => animals_entity_1.Animals),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", animals_entity_1.Animals)
], Appointments.prototype, "animals", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => clinicsDoctors_entity_1.ClinicsDoctors),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", clinicsDoctors_entity_1.ClinicsDoctors)
], Appointments.prototype, "clinicsDoctors", void 0);
Appointments = __decorate([
    (0, typeorm_1.Entity)("appointments")
], Appointments);
exports.Appointments = Appointments;
