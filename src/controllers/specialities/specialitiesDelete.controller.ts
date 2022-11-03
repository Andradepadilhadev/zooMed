import { Request, Response } from "express";
import specialitiesDeleteService from "../../services/specialities/specialitiesDelete.service";

const specialitiesDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await specialitiesDeleteService(id);

    return res.status(203).send();
  } catch (error) {}
};
export default specialitiesDeleteController;
