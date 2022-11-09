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
const appError_1 = require("../../../errors/appError");
const verifyUUID_1 = __importDefault(require("../../../utilities/verifyUUID"));
const repositories_1 = require("./../../../utilities/repositories");
const deleteAppointmentDoctorService = (id, doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    (0, verifyUUID_1.default)(id);
    const appointmentExists = yield repositories_1.appointmentsRepository.findOne({
        where: { id: id },
        relations: { clinicsDoctors: { doctor: true } },
    });
    if (!appointmentExists) {
        throw new appError_1.AppError("Appointment not found", 404);
    }
    const appointmentBelongsToDoctor = doctorId === appointmentExists.clinicsDoctors.doctor.id;
    if (!appointmentBelongsToDoctor) {
        throw new appError_1.AppError("This is not your appointment to cancel", 403);
    }
    yield repositories_1.appointmentsRepository.delete({ id });
    return { message: "Appointment canceled successfully" };
});
exports.default = deleteAppointmentDoctorService;
