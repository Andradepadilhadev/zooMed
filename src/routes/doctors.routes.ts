import { Router } from "express";
import createDoctorController from "../controllers/doctors/createDoctor.controller";
import deleteDoctorController from "../controllers/doctors/deleteDoctor.controller";
import listDoctorsController from "../controllers/doctors/listDoctors.controller";
import ensureAuthTokenMiddleware from "../middlewares/ensureAuthToken.middleware";

const routes = Router();

export const doctorsRoutes = () => {
  routes.post("", createDoctorController);
  routes.post("", listDoctorsController);
  routes.post("", ensureAuthTokenMiddleware, deleteDoctorController);

  return routes;
};
