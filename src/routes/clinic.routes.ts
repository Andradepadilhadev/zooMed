import { Router } from "express";
import clinicCreateController from "../controllers/clinic/clinicCreate.controller";
import clinicDeleteController from "../controllers/clinic/clinicDelete.controller";
import clinicListController from "../controllers/clinic/clinicList.controller";
import clinicUpdateController from "../controllers/clinic/clinicUpdate.controller";
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
