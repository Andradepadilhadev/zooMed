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
exports.deleteDoctorController = exports.updateDoctorController = exports.doctorListAppointmentController = exports.listDoctorsController = exports.createDoctorController = void 0;
const class_transformer_1 = require("class-transformer");
const createDoctor_service_1 = __importDefault(require("../../services/doctors/createDoctor.service"));
const deleteDoctor_service_1 = __importDefault(require("../../services/doctors/deleteDoctor.service"));
const doctorListAppointment_service_1 = __importDefault(require("../../services/doctors/doctorListAppointment.service"));
const listDoctors_service_1 = __importDefault(require("../../services/doctors/listDoctors.service"));
const updateDoctor_service_1 = __importDefault(require("../../services/doctors/updateDoctor.service"));
const createDoctorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, birthDate, crmv } = req.body;
    const newDoctor = yield (0, createDoctor_service_1.default)({
        name,
        email,
        password,
        birthDate,
        crmv,
    });
    return res.status(201).json((0, class_transformer_1.instanceToPlain)(newDoctor));
});
exports.createDoctorController = createDoctorController;
const listDoctorsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allDoctors = yield (0, listDoctors_service_1.default)();
    return res.status(200).json((0, class_transformer_1.instanceToPlain)(allDoctors));
});
exports.listDoctorsController = listDoctorsController;
const doctorListAppointmentController = (req, res) => {
    const { id } = req.params;
    const listAppointments = (0, doctorListAppointment_service_1.default)(id);
    return res.status(200).send(listAppointments);
};
exports.doctorListAppointmentController = doctorListAppointmentController;
const updateDoctorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, birthDate } = req.body;
    const id = req.user.id;
    const doctorUpdated = yield (0, updateDoctor_service_1.default)(id, {
        name,
        email,
        password,
        birthDate,
    });
    return res.status(200).json((0, class_transformer_1.instanceToPlain)(doctorUpdated));
});
exports.updateDoctorController = updateDoctorController;
const deleteDoctorController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield (0, deleteDoctor_service_1.default)(id);
    return res.status(200).json({ message: "Doctor deleted successfully" });
});
exports.deleteDoctorController = deleteDoctorController;
