import { Request, Response } from "express";
import listDoctorsService from "../../services/doctors/listDoctors.service";

const listDoctorsController = async (req: Request, res: Response) => {
  const allDoctors = await listDoctorsService();

  return res.status(200).json(allDoctors);
};

export default listDoctorsController;
