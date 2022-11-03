import { Router } from "express";
import listAppointmentsDoctorController from "../controllers/doctors/appointments/listAppointmentsDoctor.controller";
import createDoctorController from "../controllers/doctors/createDoctor.controller";
import deleteDoctorController from "../controllers/doctors/deleteDoctor.controller";
import listDoctorsController from "../controllers/doctors/listDoctors.controller";
import updateDoctorController from "../controllers/doctors/updateDoctor.controller";
import { createSpecialityController } from "../controllers/specialities/speciality.controller";
import ensureAuthTokenMiddleware from "../middlewares/ensureAuthToken.middleware";
import ensureDoctorMiddleware from "../middlewares/ensureDoctor.middleware";

const routes = Router();

export const doctorsRoutes = () => {
  routes.post("", createDoctorController);
  routes.get("", listDoctorsController);
  routes.delete(
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

  return routes;
};
