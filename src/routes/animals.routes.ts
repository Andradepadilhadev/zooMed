import { Router } from "express";
import createAnimalsController from "../controllers/animals/createAnimals.controller";

const routes = Router();

export const animalsRoutes = () => {
  routes.post("", createAnimalsController);
  return routes;
};
