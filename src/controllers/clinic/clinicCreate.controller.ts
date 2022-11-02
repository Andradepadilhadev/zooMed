import { Request, Response } from "express";
import { AppError } from "../../errors/appError";
import handleErrorMiddleware from "../../middlewares/handleError.middlewares";
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
  } catch (error) {}
};
export default clinicCreateController;
