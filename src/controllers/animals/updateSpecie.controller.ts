import { Request, Response } from "express";
import updateSpeciesService from "../../services/animals/updateSpecies.service";

const updateSpeciesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const updateSpecies = await updateSpeciesService(name, id);

  return res.status(200).json(updateSpecies);
};
export default updateSpeciesController;
