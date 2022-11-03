import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createDoctorService from "../../services/doctors/createDoctor.service";

const createDoctorController = async (req: Request, res: Response) => {
  const { name, email, password, birthDate, crmv } = req.body;

  const newDoctor = await createDoctorService({
    name,
    email,
    password,
    birthDate,
    crmv,
  });

  return res.status(201).json(instanceToPlain(newDoctor));
};

export default createDoctorController;
