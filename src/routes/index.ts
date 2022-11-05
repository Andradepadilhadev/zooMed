import { Express } from "express";
import { loginRoutes } from "./session.routes";
import { animalsRoutes } from "./animals.routes";
import { clinicRoutes } from "./clinic.routes";
import { doctorsRoutes } from "./doctors.routes";
import { userRoutes } from "./user.routes";
import handleErrorMiddleware from "../middlewares/handleError.middlewares";

const appRoutes = (app: Express) => {
  app.use("/login", loginRoutes());
  app.use("/users", userRoutes());
  app.use("/clinics", clinicRoutes());
  app.use("/animals", animalsRoutes());
  app.use("/doctors", doctorsRoutes());
  // app.use(handleErrorMiddleware);
};

export default appRoutes;
