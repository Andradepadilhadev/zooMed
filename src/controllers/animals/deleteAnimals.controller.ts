import { Request, Response } from "express";
import deleteAnimalService from "../../services/animals/deleteAnimals.service";

const deleteAnimalsController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await deleteAnimalService(id);

  return res.status(204).json({ message: result });
};
export default deleteAnimalsController;
