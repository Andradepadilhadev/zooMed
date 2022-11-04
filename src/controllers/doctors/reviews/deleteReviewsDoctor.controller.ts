import { Request, Response } from "express";
import deleteReviewService from "../../../services/doctors/reviews/deleteReviewDoctor.service";

const deleteReviewsController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteReviewService(id);
    return res.status(203).send();
  } catch (error) {}
};
export default deleteReviewsController;
