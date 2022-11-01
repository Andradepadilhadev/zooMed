import { Request, Response } from "express";
import { ICreateAnimalsRequest } from "../../interfaces/animals";
import createAnimalsServices from "../../services/animals/createAnimals.service";

const createAnimalsController = async (req: Request, res: Response) => {
  const data: ICreateAnimalsRequest = req.body;

  const createAnimals = await createAnimalsServices(data);

  return res.status(201).json(createAnimals);
};

export default createAnimalsController;
