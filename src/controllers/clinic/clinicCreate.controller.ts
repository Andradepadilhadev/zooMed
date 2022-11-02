import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import clinicCreateService from "../../services/clinic/clinicCreate.service";

const clinicCreateController = async (req: Request, res: Response) => {
  try {
    const { name, contact, crmv_pj, address } = req.body;
    const createdClinic = await clinicCreateService({
      name,
      contact,
      crmv_pj,
      address,
    });
    return res.status(201).send(createdClinic);
  } catch (error) {
    return res.status(400).send({ message: "deu merda aqui ó" });
  }
};
export default clinicCreateController;
