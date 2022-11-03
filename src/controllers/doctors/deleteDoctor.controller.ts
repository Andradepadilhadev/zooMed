import { Request, Response } from "express";
import deleteDoctorService from "../../services/doctors/deleteDoctor.service";

const deleteDoctorController = async (req: Request, res: Response) => {
  const id = req.params.id;

  const deleteDoctor = await deleteDoctorService(id);

  return res.status(200).json({ message: "Deleted" });
};

export default deleteDoctorController;
