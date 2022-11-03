import { Express } from "express";
import { loginRoutes } from "./session.routes";
import { animalsRoutes } from "./animals.routes";
import { clinicRoutes } from "./clinic.routes";
import { doctorsRoutes } from "./doctors.routes";

const appRoutes = (app: Express) => {
  app.use("/login", loginRoutes());
  app.use("/clinics", clinicRoutes());
  app.use("/animals", animalsRoutes());
  app.use("/doctors", doctorsRoutes());
};

export default appRoutes;
