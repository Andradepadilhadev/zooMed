import { Request, Response } from "express";
import createSpeciesServices from "../../services/animals/createSpecies.service";

const createSpeciesController = async (req: Request, res: Response) => {
  const { name } = req.body;

  const createSpecies = await createSpeciesServices(name);

  return res.status(201).json(createSpecies);
};

export default createSpeciesController;
