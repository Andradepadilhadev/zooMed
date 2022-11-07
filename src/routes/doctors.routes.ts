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
import listSelfController from "../controllers/session/listSelf.controller";
import {
  createSpecialityController,
  listAllDoctorsBySpecialityController,
  listAllSpecialitiesController,
  specialitiesDeleteController,
} from "../controllers/specialities/speciality.controller";
import ensureAuthTokenMiddleware from "../middlewares/ensureAuthToken.middleware";
import ensureDoctorMiddleware from "../middlewares/ensureDoctor.middleware";
import ensureForbiddenFieldsMiddleware from "../middlewares/ensureForbiddenFieldsMiddleware";

const routes = Router();

export const doctorsRoutes = () => {
  routes.post("", createDoctorController);

  routes.get("/profile", ensureAuthTokenMiddleware, listSelfController);

  routes.get("", listDoctorsController);

  routes.patch(
    "",
    ensureAuthTokenMiddleware,
    ensureDoctorMiddleware,
    ensureForbiddenFieldsMiddleware,
    updateDoctorController
  );

  routes.patch(
    "/:id",
    ensureAuthTokenMiddleware,
    ensureDoctorMiddleware,
    deleteDoctorController
  );

  routes.post(
    "/specialities",
    ensureAuthTokenMiddleware,
    ensureDoctorMiddleware,
    createSpecialityController
  );

  routes.get("/specialities", listAllSpecialitiesController);

  routes.patch(
    "/specialities/:id",
    ensureAuthTokenMiddleware,
    specialitiesDeleteController
  );

  routes.get("/specialities/:id", listAllDoctorsBySpecialityController);

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
    "/appointments/:id",
    ensureAuthTokenMiddleware,
    ensureDoctorMiddleware,
    deleteAppointmentDoctorController
  );

  return routes;
};
