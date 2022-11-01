import { Router } from "express";
import createAnimalsController from "../controllers/animals/createAnimals.controller";
import deleteAnimalsController from "../controllers/animals/deleteAnimals.controller";

const routes = Router();

export const animalsRoutes = () => {
  routes.post("", createAnimalsController);
  routes.delete("/:id", deleteAnimalsController);
  return routes;
};
