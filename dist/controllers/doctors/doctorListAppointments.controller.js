"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const doctorListAppointment_service_1 = __importDefault(require("../../services/doctors/doctorListAppointment.service"));
const doctorListAppointmentController = (req, res) => {
    try {
        const { id } = req.params;
        const listAppointments = (0, doctorListAppointment_service_1.default)(id);
        return res.status(200).send(listAppointments);
    }
    catch (error) { }
};
exports.default = doctorListAppointmentController;
