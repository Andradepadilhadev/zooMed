"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorsRoutes = void 0;
const express_1 = require("express");
const listAppointmentsDoctor_controller_1 = __importDefault(require("../controllers/doctors/appointments/listAppointmentsDoctor.controller"));
const doctors_controller_1 = require("../controllers/doctors/doctors.controller");
const reviews_controller_1 = require("../controllers/doctors/reviews/reviews.controller");
const speciality_controller_1 = require("../controllers/specialities/speciality.controller");
const ensureAuthToken_middleware_1 = __importDefault(require("../middlewares/ensureAuthToken.middleware"));
const ensureDoctor_middleware_1 = __importDefault(require("../middlewares/ensureDoctor.middleware"));
const routes = (0, express_1.Router)();
const doctorsRoutes = () => {
    routes.post("", doctors_controller_1.createDoctorController);
    routes.get("", doctors_controller_1.listDoctorsController);
    routes.patch("", ensureAuthToken_middleware_1.default, ensureDoctor_middleware_1.default, doctors_controller_1.deleteDoctorController);
    routes.patch("", ensureAuthToken_middleware_1.default, ensureDoctor_middleware_1.default, doctors_controller_1.updateDoctorController);
    routes.post("/specialities", ensureAuthToken_middleware_1.default, speciality_controller_1.createSpecialityController);
    routes.get("/appointments", ensureAuthToken_middleware_1.default, listAppointmentsDoctor_controller_1.default);
    routes.get("/reviews", ensureAuthToken_middleware_1.default, ensureDoctor_middleware_1.default, reviews_controller_1.listReviewsDoctorController);
    routes.patch("/reviews/:id", ensureAuthToken_middleware_1.default, ensureDoctor_middleware_1.default, reviews_controller_1.deleteReviewsController);
    return routes;
};
exports.doctorsRoutes = doctorsRoutes;
