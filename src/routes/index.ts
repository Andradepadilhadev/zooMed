import { Express } from "express";
import { animalsRoutes } from "./animals.routes";

const appRoutes = (app: Express) => {
  app.use("/animals", animalsRoutes());
};

export default appRoutes;
