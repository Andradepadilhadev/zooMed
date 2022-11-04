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
exports.Specialities = void 0;
const typeorm_1 = require("typeorm");
const doctorsSpecialities_entity_1 = require("./doctorsSpecialities.entity");
let Specialities = class Specialities {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Specialities.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80 }),
    __metadata("design:type", String)
], Specialities.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => doctorsSpecialities_entity_1.DoctorsSpecialities, (doctorsSpecialities) => doctorsSpecialities.specialtyId),
    __metadata("design:type", Array)
], Specialities.prototype, "doctorSpecialities", void 0);
Specialities = __decorate([
    (0, typeorm_1.Entity)("specialities")
], Specialities);
exports.Specialities = Specialities;
