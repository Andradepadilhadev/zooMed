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
const repositories_2 = require("../../../utilities/repositories");
const appError_1 = require("../../../errors/appError");
const createSpecialityService = (name, doctorId) => __awaiter(void 0, void 0, void 0, function* () {
    const specialityAlreadyExists = yield repositories_2.specialitiesRepository.findOneBy({
        name,
    });
    const doctor = yield repositories_1.doctorsRepository.findOne({
        where: { id: doctorId },
        relations: { doctorSpecialities: { speciality: true } },
    });
    if (specialityAlreadyExists) {
        const specialityDoctor = doctor.doctorSpecialities.filter((spec) => spec.speciality.name === name);
        if (specialityDoctor.length > 0) {
            throw new appError_1.AppError("Specialty already added", 400);
        }
        const doctorSpeciality = repositories_1.doctorsSpecialitiesRepository.create({
            doctor: doctor,
            speciality: specialityAlreadyExists,
        });
        yield repositories_1.doctorsSpecialitiesRepository.save(doctorSpeciality);
        return {
            message: "Speciality added with success",
            speciality: specialityAlreadyExists,
        };
    }
    const newSpeciality = repositories_2.specialitiesRepository.create({ name });
    yield repositories_2.specialitiesRepository.save(newSpeciality);
    const doctorSpeciality = repositories_1.doctorsSpecialitiesRepository.create({
        doctor: doctor,
        speciality: newSpeciality,
    });
    yield repositories_1.doctorsSpecialitiesRepository.save(doctorSpeciality);
    return {
        message: "Speciality added with success",
        speciality: newSpeciality,
    };
});
exports.default = createSpecialityService;
