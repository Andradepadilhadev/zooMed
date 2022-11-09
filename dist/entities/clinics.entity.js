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
exports.Clinics = void 0;
const typeorm_1 = require("typeorm");
const address_entity_1 = require("./address.entity");
const clinicsDoctors_entity_1 = require("./clinicsDoctors.entity");
let Clinics = class Clinics {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Clinics.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Clinics.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Clinics.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 5, unique: true, nullable: true }),
    __metadata("design:type", String)
], Clinics.prototype, "crmv_pj", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Clinics.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Clinics.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => address_entity_1.Address, { eager: true }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", address_entity_1.Address)
], Clinics.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => clinicsDoctors_entity_1.ClinicsDoctors, (clinicsDoctors) => clinicsDoctors.clinic),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], Clinics.prototype, "clinicsDoctors", void 0);
Clinics = __decorate([
    (0, typeorm_1.Entity)("clinics")
], Clinics);
exports.Clinics = Clinics;
