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
const address_entity_1 = require("../../entities/address.entity");
const appError_1 = require("../../errors/appError");
const clinicDeleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const clinicRepository = data_source_1.default.getRepository(clinics_entity_1.Clinics);
    const addressRepository = data_source_1.default.getRepository(address_entity_1.Address);
    const clinicAlreadyExists = yield clinicRepository.findOne({
        where: { id: id },
    });
    if (!clinicAlreadyExists) {
        throw new appError_1.AppError("Clinic not found", 404);
    }
    const addressId = clinicAlreadyExists.address.id;
    yield clinicRepository.delete(id);
    yield addressRepository.delete({ id: addressId });
    return;
});
exports.default = clinicDeleteService;
