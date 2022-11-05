import { Router } from "express";
import listAppointmentsDoctorController from "../controllers/doctors/appointments/listAppointmentsDoctor.controller";
import {
  createDoctorController,
  deleteDoctorController,
  listDoctorsController,
  updateDoctorController,
} from "../controllers/doctors/doctors.controller";
import {
  deleteReviewsController,
  listReviewsDoctorController,
} from "../controllers/doctors/reviews/reviews.controller";
import { createSpecialityController } from "../controllers/specialities/speciality.controller";
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
    createSpecialityController
  );
  routes.get(
    "/appointments",
    ensureAuthTokenMiddleware,
    listAppointmentsDoctorController
  );
  routes.get(
    "/reviews",
    ensureAuthTokenMiddleware,
    ensureDoctorMiddleware,
    listReviewsDoctorController
  );
  routes.patch(
    "/reviews/:id",
    ensureAuthTokenMiddleware,
    ensureDoctorMiddleware,
    deleteReviewsController
  );

  return routes;
};
