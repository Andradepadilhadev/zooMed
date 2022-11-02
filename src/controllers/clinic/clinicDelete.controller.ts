import { Request, Response } from "express";
import clinicDeleteService from "../../services/clinic/clinicDelete.service";

const clinicDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await clinicDeleteService(id);
    return res.status(203).send();
  } catch (error) {}
};
export default clinicDeleteController;
