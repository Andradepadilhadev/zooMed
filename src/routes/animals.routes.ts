import { Router } from "express";
import createAnimalsController from "../controllers/animals/createAnimals.controller";
import createSpeciesController from "../controllers/animals/createSpecies.controller";
import deleteAnimalsController from "../controllers/animals/deleteAnimals.controller";
import updateSpeciesController from "../controllers/animals/updateSpecie.controller";
import ensureAuthTokenMiddleware from "../middlewares/ensureAuthToken.middleware";

const routes = Router();

export const animalsRoutes = () => {
  routes.post("", ensureAuthTokenMiddleware, createAnimalsController);
  routes.delete("/:id", ensureAuthTokenMiddleware, deleteAnimalsController);
  routes.post("/species", ensureAuthTokenMiddleware, createSpeciesController);
  routes.patch(
    "/species/:id",
    ensureAuthTokenMiddleware,
    updateSpeciesController
  );
  return routes;
};
