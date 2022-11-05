import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { ICreateAnimalsRequest } from "../../interfaces/animals";
import createAnimalsServices from "../../services/animals/createAnimals.service";
import createSpeciesServices from "../../services/animals/createSpecies.service";
import listSpeciesServices from "../../services/animals/listSpecies.service";
import updateSpeciesService from "../../services/animals/updateSpecies.service";
import deleteAnimalService from "../../services/animals/deleteAnimals.service";
import deleteSpeciesService from "../../services/animals/deleteSpecies.service";

const createAnimalsController = async (req: Request, res: Response) => {
  const data: ICreateAnimalsRequest = req.body;
  const userId = req.user.id;
  const createAnimals = await createAnimalsServices(data, userId);
  return res.status(201).json(instanceToPlain(createAnimals));
};

const createSpeciesController = async (req: Request, res: Response) => {
  const { name } = req.body;
  const createSpecies = await createSpeciesServices(name);
  return res.status(201).json(createSpecies);
};

const listSpeciesController = async (req: Request, res: Response) => {
  const species = await listSpeciesServices();
  return res.status(200).json(species);
};

const updateSpeciesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const updateSpecies = await updateSpeciesService(name, id);
  return res.status(200).json(updateSpecies);
};
const deleteAnimalsController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user.id;
  const result = await deleteAnimalService(id, userId);
  return res.status(200).json({ message: result });
};

const deleteSpeciesController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const doctorId = req.user.id;
  const result = await deleteSpeciesService(id, doctorId);
  return res.status(200).json({ message: result });
};

export {
  createAnimalsController,
  createSpeciesController,
  deleteAnimalsController,
  listSpeciesController,
  updateSpeciesController,
  deleteSpeciesController,
};
