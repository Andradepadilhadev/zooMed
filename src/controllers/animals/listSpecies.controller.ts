import { Request, Response } from "express";
import listSpeciesServices from "../../services/animals/listSpecies.service";

const listSpeciesController = async (req: Request, res: Response) => {
  const species = await listSpeciesServices();

  return res.status(200).json(species);
};

export default listSpeciesController;
