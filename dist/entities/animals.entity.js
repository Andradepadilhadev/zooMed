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
exports.Animals = void 0;
const typeorm_1 = require("typeorm");
const appointments_entity_1 = require("./appointments.entity");
const species_entity_1 = require("./species.entity");
const users_entity_1 = require("./users.entity");
let Animals = class Animals {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Animals.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Animals.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Animals.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 200 }),
    __metadata("design:type", String)
], Animals.prototype, "breed", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Animals.prototype, "isAlive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users),
    __metadata("design:type", users_entity_1.Users)
], Animals.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => species_entity_1.Species),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", species_entity_1.Species)
], Animals.prototype, "species", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => appointments_entity_1.Appointments, (appointments) => appointments.animals),
    __metadata("design:type", Array)
], Animals.prototype, "appointments", void 0);
Animals = __decorate([
    (0, typeorm_1.Entity)("animals")
], Animals);
exports.Animals = Animals;
