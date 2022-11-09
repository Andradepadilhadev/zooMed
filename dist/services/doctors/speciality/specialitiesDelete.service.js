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
const specialitiesDeleteService = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const specialityAlreadyExists = repositories_1.specialitiesRepository.findOne({
        where: { id: id },
    });
    if (!specialityAlreadyExists) {
        throw new appError_1.AppError("Speciality not found", 404);
    }
    const specialityDoctorExists = yield repositories_1.doctorsSpecialitiesRepository.findOneBy({
        speciality: { id },
        doctor: { id: userId },
    });
    if (!specialityDoctorExists) {
        throw new appError_1.AppError("Speciality has already been removed", 400);
    }
    yield repositories_1.doctorsSpecialitiesRepository.delete({
        speciality: { id },
        doctor: { id: userId },
    });
    return { message: "Speciality has been removed" };
});
exports.default = specialitiesDeleteService;
