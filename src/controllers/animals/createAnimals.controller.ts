import { Request, Response } from "express";
import { ICreateAnimalsRequest } from "../../interfaces/animals";
import createAnimalsServices from "../../services/animals/createAnimals.service";

const createAnimalsController = async (req: Request, res: Response) => {
  const data: ICreateAnimalsRequest = req.body;
  const userId = req.user.id;

  const createAnimals = await createAnimalsServices(data, userId);

  return res.status(201).json(createAnimals);
};

export default createAnimalsController;
