import { Express } from "express";
import { clinicRoutes } from "./clinic.routes";

const appRoutes = (app: Express) => {
  app.use("/clinics", clinicRoutes());
};

export default appRoutes;
