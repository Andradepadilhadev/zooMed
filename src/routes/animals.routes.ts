import { Router } from "express";
import {
  createAnimalsController,
  createSpeciesController,
  deleteAnimalsController,
  listSpeciesController,
  updateSpeciesController,
} from "../controllers/animals/animals.controllers";
import ensureAuthTokenMiddleware from "../middlewares/ensureAuthToken.middleware";
import ensureDoctorMiddleware from "../middlewares/ensureDoctor.middleware";

const routes = Router();

export const animalsRoutes = () => {
  routes.post("", ensureAuthTokenMiddleware, createAnimalsController);
  routes.patch("/:id", ensureAuthTokenMiddleware, deleteAnimalsController);
  routes.post(
    "/species",
    ensureAuthTokenMiddleware,
    ensureDoctorMiddleware,
    createSpeciesController
  );
  routes.get("/species", ensureAuthTokenMiddleware, listSpeciesController);
  routes.patch(
    "/species/:id",
    ensureAuthTokenMiddleware,
    updateSpeciesController
  );
  routes.patch(
    "/species/:id",
    ensureAuthTokenMiddleware,
    ensureDoctorMiddleware,
    deleteAnimalsController
  );
  return routes;
};
