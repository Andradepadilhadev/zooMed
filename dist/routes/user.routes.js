"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_cotroller_1 = require("../controllers/user/user.cotroller");
const express_1 = require("express");
const ensureAuthToken_middleware_1 = __importDefault(require("../middlewares/ensureAuthToken.middleware"));
const ensureForbiddenFieldsMiddleware_1 = __importDefault(require("../middlewares/ensureForbiddenFieldsMiddleware"));
const ensureUser_middleware_1 = __importDefault(require("../middlewares/ensureUser.middleware"));
const listSelf_controller_1 = __importDefault(require("../controllers/session/listSelf.controller"));
const routes = (0, express_1.Router)();
const userRoutes = () => {
    routes.post("", user_cotroller_1.createUserController);
    routes.get("/profile", ensureAuthToken_middleware_1.default, ensureUser_middleware_1.default, listSelf_controller_1.default);
    routes.patch("/:id", ensureAuthToken_middleware_1.default, ensureUser_middleware_1.default, user_cotroller_1.deleteUserController);
    routes.patch("", ensureAuthToken_middleware_1.default, ensureForbiddenFieldsMiddleware_1.default, ensureUser_middleware_1.default, user_cotroller_1.updateUserController);
    routes.get("", ensureAuthToken_middleware_1.default, user_cotroller_1.listAllUserController);
    routes.get("/animals", ensureAuthToken_middleware_1.default, ensureUser_middleware_1.default, user_cotroller_1.listAllAnimalUserController);
    routes.post("/appointments", ensureAuthToken_middleware_1.default, ensureUser_middleware_1.default, user_cotroller_1.createUserAppointmentsController);
    routes.patch("/appointments/:id", ensureAuthToken_middleware_1.default, ensureUser_middleware_1.default, user_cotroller_1.deleteUserAppointmentsController);
    routes.get("/appointments", ensureAuthToken_middleware_1.default, ensureUser_middleware_1.default, user_cotroller_1.listAllUserAppointmentsController);
    routes.post("/reviews", ensureAuthToken_middleware_1.default, ensureUser_middleware_1.default, user_cotroller_1.createUserReviewsController);
    routes.get("/reviews", ensureAuthToken_middleware_1.default, ensureUser_middleware_1.default, user_cotroller_1.listUsersReviewsController);
    routes.patch("/reviews/:id", ensureAuthToken_middleware_1.default, ensureUser_middleware_1.default, ensureForbiddenFieldsMiddleware_1.default, user_cotroller_1.updatedUserReviewsController);
    return routes;
};
exports.userRoutes = userRoutes;
