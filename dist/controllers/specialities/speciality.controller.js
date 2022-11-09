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
exports.specialitiesDeleteController = exports.listAllDoctorsBySpecialityController = exports.listAllSpecialitiesController = exports.createSpecialityController = void 0;
const listAllSpeciality_service_1 = __importDefault(require("../../services/doctors/speciality/listAllSpeciality.service"));
const listDoctorBySpeciality_service_1 = __importDefault(require("../../services/doctors/speciality/listDoctorBySpeciality.service"));
const specialitiesDelete_service_1 = __importDefault(require("../../services/doctors/speciality/specialitiesDelete.service"));
const createSpeciality_service_1 = __importDefault(require("../../services/doctors/speciality/createSpeciality.service"));
const class_transformer_1 = require("class-transformer");
const createSpecialityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const doctorId = req.user.id;
    const newSpeciality = yield (0, createSpeciality_service_1.default)(name, doctorId);
    return res.status(201).json(newSpeciality);
});
exports.createSpecialityController = createSpecialityController;
const listAllSpecialitiesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listSpecs = yield (0, listAllSpeciality_service_1.default)();
    return res.json(listSpecs);
});
exports.listAllSpecialitiesController = listAllSpecialitiesController;
const listAllDoctorsBySpecialityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const listDocs = yield (0, listDoctorBySpeciality_service_1.default)(id);
    return res.json((0, class_transformer_1.instanceToPlain)(listDocs));
});
exports.listAllDoctorsBySpecialityController = listAllDoctorsBySpecialityController;
const specialitiesDeleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user.id;
    const specialityDeleted = yield (0, specialitiesDelete_service_1.default)(id, userId);
    return res.status(200).json(specialityDeleted);
});
exports.specialitiesDeleteController = specialitiesDeleteController;
