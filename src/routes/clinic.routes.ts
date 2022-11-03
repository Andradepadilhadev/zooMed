import { Router } from "express";
import {
  clinicCreateController,
  clinicDeleteController,
  clinicListController,
  clinicUpdateController,
} from "../controllers/clinic/clinic.controller";
import ensureAuthTokenMiddleware from "../middlewares/ensureAuthToken.middleware";
import ensureDoctorMiddleware from "../middlewares/ensureDoctor.middleware";

const routes = Router();

export const clinicRoutes = () => {
  routes.post(
    "",
    ensureAuthTokenMiddleware,
    ensureDoctorMiddleware,
    clinicCreateController
  );
  routes.get("", clinicListController);
  routes.patch(
    "/:id",
    ensureAuthTokenMiddleware,
    ensureDoctorMiddleware,
    clinicUpdateController
  );
  routes.delete(
    "/:id",
    ensureAuthTokenMiddleware,
    ensureDoctorMiddleware,
    clinicDeleteController
  );
  return routes;
};
