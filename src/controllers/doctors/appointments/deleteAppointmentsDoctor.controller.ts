import { Request, Response } from "express";
import deleteAppointmentDoctorService from "../../../services/doctors/appointments/deleteAppointmentsDoctor.service";

const deleteAppointmentDoctorController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    await deleteAppointmentDoctorService(id);
    return res.status(203).send();
  } catch (error) {}
};
export default deleteAppointmentDoctorController;
