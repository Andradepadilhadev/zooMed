"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animalsRoutes = void 0;
const express_1 = require("express");
const animals_controllers_1 = require("../controllers/animals/animals.controllers");
const ensureAuthToken_middleware_1 = __importDefault(require("../middlewares/ensureAuthToken.middleware"));
const ensureDoctor_middleware_1 = __importDefault(require("../middlewares/ensureDoctor.middleware"));
const routes = (0, express_1.Router)();
const animalsRoutes = () => {
    routes.post("", ensureAuthToken_middleware_1.default, animals_controllers_1.createAnimalsController);
    routes.patch("/:id", ensureAuthToken_middleware_1.default, animals_controllers_1.deleteAnimalsController);
    routes.post("/species", ensureAuthToken_middleware_1.default, ensureDoctor_middleware_1.default, animals_controllers_1.createSpeciesController);
    routes.get("/species", ensureAuthToken_middleware_1.default, animals_controllers_1.listSpeciesController);
    routes.patch("/species/:id", ensureAuthToken_middleware_1.default, animals_controllers_1.updateSpeciesController);
    routes.patch("/species/:id", ensureAuthToken_middleware_1.default, ensureDoctor_middleware_1.default, animals_controllers_1.deleteAnimalsController);
    return routes;
};
exports.animalsRoutes = animalsRoutes;
