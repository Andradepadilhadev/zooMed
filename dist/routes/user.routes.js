"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_cotroller_1 = require("../controllers/user/user.cotroller");
const express_1 = require("express");
const ensureAuthToken_middleware_1 = __importDefault(require("../middlewares/ensureAuthToken.middleware"));
const routes = (0, express_1.Router)();
const userRoutes = () => {
    routes.post("", user_cotroller_1.createUserController);
    routes.delete("", ensureAuthToken_middleware_1.default, user_cotroller_1.deleteUserController);
    routes.patch("", ensureAuthToken_middleware_1.default, user_cotroller_1.updateUserController);
    routes.get("", ensureAuthToken_middleware_1.default, user_cotroller_1.listAllUserController);
    routes.get("/animals", ensureAuthToken_middleware_1.default, user_cotroller_1.listAllAnimalUserController);
    routes.post("/appointments", ensureAuthToken_middleware_1.default, user_cotroller_1.createUserAppointmentsController);
    routes.delete("/appointments/:id", ensureAuthToken_middleware_1.default, user_cotroller_1.deleteUserAppointmentsController);
    routes.get("/appointments", ensureAuthToken_middleware_1.default, user_cotroller_1.listAllUserAppointmentsController);
    routes.post("/reviews", ensureAuthToken_middleware_1.default, user_cotroller_1.createUserReviewsController);
    routes.patch("/reviews/:id", ensureAuthToken_middleware_1.default, user_cotroller_1.updatedUserReviewsController);
    return routes;
};
exports.userRoutes = userRoutes;
