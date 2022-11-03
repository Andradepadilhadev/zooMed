import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import updateDoctorService from "../../services/doctors/updateDoctor.service";

const updateDoctorController = async (req: Request, res: Response) => {
  const { name, email, password, birthDate } = req.body;

  const doctorUpdated = await updateDoctorService({
    name,
    email,
    password,
    birthDate,
  });

  return res.status(200).json(instanceToPlain(doctorUpdated));
};

export default updateDoctorController;
