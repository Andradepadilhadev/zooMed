import { Request, Response } from "express";
import deleteAppointmentDoctorService from "../../../services/doctors/appointments/deleteAppointmentsDoctor.service";

const deleteAppointmentDoctorController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const doctorId = req.user.id;

  const deletedAppointment = await deleteAppointmentDoctorService(id, doctorId);

  return res.status(200).send(deletedAppointment);
};
export default deleteAppointmentDoctorController;
