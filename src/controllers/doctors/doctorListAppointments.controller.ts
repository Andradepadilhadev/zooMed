import { Request, Response } from "express";
import doctorListAppointmentService from "../../services/doctors/doctorListAppointment.service";

const doctorListAppointmentController = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listAppointments = doctorListAppointmentService(id);
    return res.status(200).send(listAppointments);
  } catch (error) {}
};
export default doctorListAppointmentController;
