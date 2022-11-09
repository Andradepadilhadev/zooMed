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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyDateFormat_1 = require("./../../../utilities/verifyDateFormat");
const repositories_1 = require("./../../../utilities/repositories");
const appointments_entity_1 = require("../../../entities/appointments.entity");
const appError_1 = require("../../../errors/appError");
const repositories_2 = require("../../../utilities/repositories");
const verifyAppointmentDate_1 = require("../../../utilities/verifyAppointmentDate");
const verifyUUID_1 = __importDefault(require("../../../utilities/verifyUUID"));
const createAppointmentsService = ({ date, hour, animalId, clinicsDoctorsId, }) => __awaiter(void 0, void 0, void 0, function* () {
    (0, verifyDateFormat_1.verifyDateFormat)(date);
    (0, verifyAppointmentDate_1.verifyAppointmentDate)(date, hour);
    (0, verifyUUID_1.default)(animalId);
    (0, verifyUUID_1.default)(clinicsDoctorsId);
    const clinicDoctor = yield repositories_1.clinicsDoctorsRepository.findOne({
        where: { id: clinicsDoctorsId },
        relations: { doctor: true },
    });
    const animal = yield repositories_2.animalsRepository.findOneBy({ id: animalId });
    if (!clinicDoctor) {
        throw new appError_1.AppError("Doctor not registered in this Clinic", 404);
    }
    if (!animal) {
        throw new appError_1.AppError("Animal not found", 404);
    }
    const appointmentAlreadyExists = yield repositories_2.appointmentsRepository.findOne({
        where: {
            date,
            hour,
            clinicsDoctors: { doctor: { id: clinicDoctor.doctor.id } },
        },
        relations: { clinicsDoctors: { doctor: true } },
    });
    if (appointmentAlreadyExists) {
        throw new appError_1.AppError("This appointment time is not available", 400);
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
