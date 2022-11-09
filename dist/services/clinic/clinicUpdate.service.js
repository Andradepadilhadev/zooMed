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
const verifyUUID_1 = __importDefault(require("../../utilities/verifyUUID"));
const updateAddress_service_1 = __importDefault(require("../address/updateAddress.service"));
const clinicUpdateService = (id, userId, { name, contact, crmv_pj, address }) => __awaiter(void 0, void 0, void 0, function* () {
    (0, verifyUUID_1.default)(id);
    const findClinic = yield repositories_1.clinicsRepository.findOne({
        where: { id: id },
        relations: { address: true },
    });
    if (!findClinic) {
        throw new appError_1.AppError("Clinic not found", 404);
    }
    const doctor = yield repositories_1.doctorsRepository.findOne({
        where: { id: userId },
    });
    const clinicDoctor = yield repositories_1.clinicsDoctorsRepository.findOne({
        where: { clinic: { id: findClinic.id }, doctor: { id: doctor.id } },
        relations: { clinic: true, doctor: true },
    });
    if (!clinicDoctor) {
        throw new appError_1.AppError("You are no longer registered at this clinic", 400);
    }
    if (address) {
        yield (0, updateAddress_service_1.default)(address, findClinic.address.id);
    }
    yield repositories_1.clinicsRepository.update({ id }, {
        name: name ? name : findClinic.name,
        contact: contact ? contact : findClinic.contact,
        crmv_pj: crmv_pj ? crmv_pj : findClinic.crmv_pj,
        address: findClinic.address,
    });
    const updatedClinic = yield repositories_1.clinicsRepository.findOne({
        where: { id: id },
    });
    return updatedClinic;
});
exports.default = clinicUpdateService;
