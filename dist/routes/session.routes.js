"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginRoutes = void 0;
const express_1 = require("express");
const session_controllers_1 = __importDefault(require("../controllers/session/session.controllers"));
const routes = (0, express_1.Router)();
const loginRoutes = () => {
    routes.post("", session_controllers_1.default);
    return routes;
};
exports.loginRoutes = loginRoutes;
