import { Express } from "express";
import { loginRoutes } from "./session.routes";
import { animalsRoutes } from "./animals.routes";
import { clinicRoutes } from "./clinic.routes";
import { userRoutes } from "./user.routes";

const appRoutes = (app: Express) => {
  app.use("/login", loginRoutes());
  app.use("/user", userRoutes())
  app.use("/clinics", clinicRoutes());
  app.use("/animals", animalsRoutes());
};

export default appRoutes;
