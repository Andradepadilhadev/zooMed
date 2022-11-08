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
exports.specialitiesDeleteController = exports.listAllDocsBySpecsController = exports.listAllSpecController = exports.createSpecialityController = void 0;
const listAllSpeciality_service_1 = __importDefault(require("../../services/doctors/speciality/listAllSpeciality.service"));
const listDoctorBySpeciality_service_1 = __importDefault(require("../../services/doctors/speciality/listDoctorBySpeciality.service"));
const specialitiesDelete_service_1 = __importDefault(require("../../services/doctors/speciality/specialitiesDelete.service"));
const createSpeciality_service_1 = __importDefault(require("../../services/doctors/speciality/createSpeciality.service"));
const createSpecialityController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const newSpeciality = (0, createSpeciality_service_1.default)(name);
    return res.status(200).json({ newSpeciality });
});
exports.createSpecialityController = createSpecialityController;
const listAllSpecController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listSpecs = yield (0, listAllSpeciality_service_1.default)();
    return res.json(listSpecs);
});
exports.listAllSpecController = listAllSpecController;
const listAllDocsBySpecsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { specId } = req.params;
    const listDocs = yield (0, listDoctorBySpeciality_service_1.default)(specId);
    return res.json(listDocs);
});
exports.listAllDocsBySpecsController = listAllDocsBySpecsController;
const specialitiesDeleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, specialitiesDelete_service_1.default)(id);
        return res.status(203).send();
    }
    catch (error) { }
});
exports.specialitiesDeleteController = specialitiesDeleteController;
