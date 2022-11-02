import { Express } from "express";
import { loginRoutes } from "./session.routes";
import { animalsRoutes } from "./animals.routes";
import { clinicRoutes } from "./clinic.routes";

const appRoutes = (app: Express) => {
  app.use("/clinics", clinicRoutes());
  app.use("/login", loginRoutes());
  app.use("/animals", animalsRoutes());
};

export default appRoutes;
