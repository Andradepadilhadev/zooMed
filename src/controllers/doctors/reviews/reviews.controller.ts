import { Request, Response } from "express";
import deleteAppointmentDoctorService from "../../../services/doctors/appointments/deleteAppointmentsDoctor.service";
import listReviewDoctorService from "../../../services/doctors/reviews/listReviewDoctor.service";

const listReviewsDoctorController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const listReviews = await listReviewDoctorService(id);
  return res.status(200).send(listReviews);
};

export { listReviewsDoctorController };
