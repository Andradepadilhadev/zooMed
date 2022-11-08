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
const createAdrress_service_1 = __importDefault(require("../address/createAdrress.service"));
const clinicCreateService = ({ name, contact, crmv_pj, address, }) => __awaiter(void 0, void 0, void 0, function* () {
    const clinicRepository = data_source_1.default.getRepository(clinics_entity_1.Clinics);
    const clinicAlreadyExists = yield clinicRepository.findOne({
        where: { name: name },
    });
    if (clinicAlreadyExists) {
        throw new appError_1.AppError("Clinic Already Exists", 404);
    }
    const newClinic = new clinics_entity_1.Clinics();
    newClinic.name = name;
    newClinic.contact = contact;
    newClinic.address = yield (0, createAdrress_service_1.default)(address);
    crmv_pj && (newClinic.crmv_pj = crmv_pj);
    clinicRepository.create(newClinic);
    yield clinicRepository.save(newClinic);
    return {
        message: "Created sucessfully",
        Clinic: newClinic,
    };
});
exports.default = clinicCreateService;
