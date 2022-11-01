import { Request, Response } from "express";
import deleteAnimalService from "../../services/animals/deleteAnimals.service";

const deleteAnimalsController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;

  const result = await deleteAnimalService(id, userId);

  return res.status(200).json({ message: result });
};
export default deleteAnimalsController;
