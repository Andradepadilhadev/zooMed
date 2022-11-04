import { Request, Response } from "express";
import listAppointmentsDoctorService from "../../../services/doctors/appointments/listAppointmentsDoctor.service";

const listAppointmentsDoctorController = async (
  req: Request,
  res: Response
) => {
  const id = req.user.id;

  const appointmentsDoctor = await listAppointmentsDoctorService(id);

  return res.status(200).json(appointmentsDoctor);
};

export default listAppointmentsDoctorController;
