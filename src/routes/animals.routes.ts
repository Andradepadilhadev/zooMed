import { Router } from "express";
import createAnimalsController from "../controllers/animals/createAnimals.controller";
import deleteAnimalsController from "../controllers/animals/deleteAnimals.controller";
import ensureAuthTokenMiddleware from "../middlewares/ensureAuthToken.middleware";

const routes = Router();

export const animalsRoutes = () => {
  routes.post("", ensureAuthTokenMiddleware, createAnimalsController);
  routes.delete("/:id", ensureAuthTokenMiddleware, deleteAnimalsController);
  return routes;
};
