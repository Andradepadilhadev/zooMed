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
const appError_1 = require("../../errors/appError");
const repositories_1 = require("../../utilities/repositories");
const createAdrress_service_1 = __importDefault(require("../address/createAdrress.service"));
const clinicCreateService = ({ name, contact, crmv_pj, address }, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const clinic = yield repositories_1.clinicsRepository.findOne({
        where: { name },
    });
    if (clinic) {
        if (clinic.crmv_pj === crmv_pj) {
            throw new appError_1.AppError("Clinic crmv Already Exists", 409);
        }
        throw new appError_1.AppError("Clinic name Already Exists", 409);
    }
    const newAddress = yield (0, createAdrress_service_1.default)(address);
    const newClinic = repositories_1.clinicsRepository.create({
        name,
        contact,
        crmv_pj,
        address: newAddress,
    });
    const doctor = yield repositories_1.doctorsRepository.findOne({ where: { id: userId } });
    yield repositories_1.clinicsRepository.save(newClinic);
    const clinicDoctor = repositories_1.clinicsDoctorsRepository.create({
        clinic: newClinic,
        doctor: doctor,
    });
    yield repositories_1.clinicsDoctorsRepository.save(clinicDoctor);
    return newClinic;
});
exports.default = clinicCreateService;
