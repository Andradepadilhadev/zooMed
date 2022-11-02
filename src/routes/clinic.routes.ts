import { Router } from "express";
import clinicCreateController from "../controllers/clinic/clinicCreate.controller";
import clinicDeleteController from "../controllers/clinic/clinicDelete.controller";
import clinicListController from "../controllers/clinic/clinicList.controller";
import clinicUpdateController from "../controllers/clinic/clinicUpdate.controller";

const routes = Router();

export const clinicRoutes = () => {
  routes.post("", clinicCreateController);
  routes.get("", clinicListController);
  routes.patch("/:id", clinicUpdateController);
  routes.delete("/:id", clinicDeleteController);
  return routes;
};
