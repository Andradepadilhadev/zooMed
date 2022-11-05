import { Router } from "express";
import deleteAppointmentDoctorController from "../controllers/doctors/appointments/deleteAppointmentsDoctor.controller";
import listAppointmentsDoctorController from "../controllers/doctors/appointments/listAppointmentsDoctor.controller";
import {
  createDoctorController,
  deleteDoctorController,
  listDoctorsController,
  updateDoctorController,
} from "../controllers/doctors/doctors.controller";
import { listReviewsDoctorController } from "../controllers/doctors/reviews/reviews.controller";

import {
  createSpecialityController,
  listAllDoctorsBySpecialityController,
  listAllSpecialitiesController,
} from "../controllers/specialities/speciality.controller";
import ensureAuthTokenMiddleware from "../middlewares/ensureAuthToken.middleware";
import ensureDoctorMiddleware from "../middlewares/ensureDoctor.middleware";

const routes = Router();

export const doctorsRoutes = () => {
  routes.post("", createDoctorController);

  routes.get("", listDoctorsController);

  routes.patch(
    "",
    ensureAuthTokenMiddleware,
    ensureDoctorMiddleware,
    deleteDoctorController
  );

  routes.patch(
    "",
    ensureAuthTokenMiddleware,
    ensureDoctorMiddleware,
    updateDoctorController
  );

  routes.post(
    "/specialities",
    ensureAuthTokenMiddleware,
    ensureDoctorMiddleware,
    createSpecialityController
  );

  routes.get("/specialities", listAllSpecialitiesController);

  routes.get("/specialities/:id", listAllDoctorsBySpecialityController);

  routes.get(
    "/appointments",
    ensureAuthTokenMiddleware,
    listAppointmentsDoctorController
  );

  routes.get(
    "/reviews",
    ensureAuthTokenMiddleware,
    listReviewsDoctorController
  );

  routes.patch(
    "/reviews/:id",
    ensureAuthTokenMiddleware,
    ensureDoctorMiddleware,
    deleteAppointmentDoctorController
  );

  return routes;
};
