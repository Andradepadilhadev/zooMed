"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clinicRoutes = void 0;
const express_1 = require("express");
const clinic_controller_1 = require("../controllers/clinic/clinic.controller");
const ensureAuthToken_middleware_1 = __importDefault(require("../middlewares/ensureAuthToken.middleware"));
const ensureDoctor_middleware_1 = __importDefault(require("../middlewares/ensureDoctor.middleware"));
const routes = (0, express_1.Router)();
const clinicRoutes = () => {
    routes.post("", ensureAuthToken_middleware_1.default, ensureDoctor_middleware_1.default, clinic_controller_1.clinicCreateController);
    routes.get("", clinic_controller_1.clinicListController);
    routes.patch("/:id", ensureAuthToken_middleware_1.default, ensureDoctor_middleware_1.default, clinic_controller_1.clinicUpdateController);
    routes.delete("/:id", ensureAuthToken_middleware_1.default, ensureDoctor_middleware_1.default, clinic_controller_1.clinicDeleteController);
    return routes;
};
exports.clinicRoutes = clinicRoutes;
