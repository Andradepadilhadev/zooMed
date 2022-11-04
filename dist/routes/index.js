"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session_routes_1 = require("./session.routes");
const animals_routes_1 = require("./animals.routes");
const clinic_routes_1 = require("./clinic.routes");
const doctors_routes_1 = require("./doctors.routes");
const user_routes_1 = require("./user.routes");
const appRoutes = (app) => {
    app.use("/login", (0, session_routes_1.loginRoutes)());
    app.use("/user", (0, user_routes_1.userRoutes)());
    app.use("/clinics", (0, clinic_routes_1.clinicRoutes)());
    app.use("/animals", (0, animals_routes_1.animalsRoutes)());
    app.use("/doctors", (0, doctors_routes_1.doctorsRoutes)());
};
exports.default = appRoutes;
