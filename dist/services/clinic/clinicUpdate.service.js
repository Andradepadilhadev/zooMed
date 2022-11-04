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
const data_source_1 = __importDefault(require("../../data-source"));
const clinics_entity_1 = require("../../entities/clinics.entity");
const appError_1 = require("../../errors/appError");
const clinicUpdateService = (id, { name, contact, crmv_pj, address, clinicsDoctors }) => __awaiter(void 0, void 0, void 0, function* () {
    const clinicsRepository = data_source_1.default.getRepository(clinics_entity_1.Clinics);
    const findClinic = yield clinicsRepository.findOne({ where: { id: id } });
    if (!findClinic) {
        throw new appError_1.AppError("Clinic not found", 404);
    }
    const updatedAt = yield new Date();
    yield clinicsRepository.update({ id }, {
        name,
        contact,
        crmv_pj,
        address,
        updatedAt,
        clinicsDoctors,
    });
    const updatedClinic = yield clinicsRepository.findOne({
        where: { id: id },
    });
    return {
        message: "Clinic updated!",
        clinic: updatedClinic,
    };
});
exports.default = clinicUpdateService;
