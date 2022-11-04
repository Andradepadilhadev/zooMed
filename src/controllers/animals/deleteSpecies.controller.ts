import { Request, Response } from "express";
import deleteSpeciesService from "../../services/animals/deleteSpecies.service";

const deleteAnimalsController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const doctorId = req.user.id;

  const result = await deleteSpeciesService(id, doctorId);

  return res.status(200).json({ message: result });
};
export default deleteAnimalsController;
