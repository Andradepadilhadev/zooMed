import { Express } from "express";

const appRoutes = (app: Express) => {
  
import { loginRoutes } from "./session.routes";
import { clinicRoutes } from "./clinic.routes";
import { animalsRoutes } from "./animals.routes";

const appRoutes = (app: Express) => {
    app.use("/login", loginRoutes());
    app.use("/clinics", clinicRoutes());
    app.use("/animals", animalsRoutes());
};

export default appRoutes;
