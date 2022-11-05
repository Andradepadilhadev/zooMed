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
const repositories_1 = require("./../../../utilities/repositories");
const appointments_entity_1 = require("../../../entities/appointments.entity");
const appError_1 = require("../../../errors/appError");
const repositories_2 = require("../../../utilities/repositories");
const createAppointmentsService = ({ date, hour, animalsId, doctorId, }) => __awaiter(void 0, void 0, void 0, function* () {
    const clinicDoctor = yield repositories_1.clinicsDoctorsRepository.findOneBy({
        doctor: doctorId,
    });
    const animal = yield repositories_2.animalsRepository.findOneBy({ id: animalsId });
    if (!clinicDoctor || !animal) {
        throw new appError_1.AppError("Not found, doctor or animal", 400);
    }
    const newAppointments = new appointments_entity_1.Appointments();
    newAppointments.date = date;
    newAppointments.hour = hour;
    newAppointments.animals = animal;
    newAppointments.clinicsDoctors = clinicDoctor;
    repositories_2.appointmentsRepository.save(newAppointments);
    return newAppointments;
});
exports.default = createAppointmentsService;
