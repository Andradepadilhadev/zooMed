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
const appError_1 = require("../../errors/appError");
const repositories_1 = require("../../utilities/repositories");
const clinicDeleteService = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const clinic = yield repositories_1.clinicsRepository.findOne({
        where: { id: id },
    });
    if (!clinic) {
        throw new appError_1.AppError("Clinic not found", 404);
    }
    const clinicsDoctors = yield repositories_1.clinicsDoctorsRepository.findOne({
        where: {
            clinic: { id },
            doctor: { id: userId },
        },
        relations: {
            clinic: true,
            doctor: true,
        },
    });
    if (!clinicsDoctors) {
        throw new appError_1.AppError("Clinic has already been removed", 400);
    }
    yield repositories_1.clinicsDoctorsRepository.delete({
        id: clinicsDoctors.id,
    });
    return "Clinic removed successfully";
});
exports.default = clinicDeleteService;
