import { Request, Response } from "express";
import listReviewDoctorService from "../../../services/doctors/reviews/listReviewDoctor.service";

const listReviewsDoctorController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listReviews = await listReviewDoctorService(id);
    return res.status(200).send(listReviews);
  } catch (error) {}
};
export default listReviewsDoctorController;
