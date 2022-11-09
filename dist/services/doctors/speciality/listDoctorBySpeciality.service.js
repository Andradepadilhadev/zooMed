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
const appError_1 = require("../../../errors/appError");
const repositories_1 = require("../../../utilities/repositories");
const listDoctorBySpecialityService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const speciality = yield repositories_1.specialitiesRepository.findBy({
        id: id,
    });
    if (!speciality) {
        throw new appError_1.AppError("Speciality not found", 400);
    }
    const doctors = yield repositories_1.doctorsRepository.find({
        where: { doctorSpecialities: { speciality: { id } } },
        relations: { doctorSpecialities: { speciality: true } },
    });
    return doctors;
});
exports.default = listDoctorBySpecialityService;
