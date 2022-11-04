import listAllSpecialityService from "../../services/doctors/speciality/listAllSpeciality.service";
import { Request, Response } from "express";
import listDoctorBySpecialityService from "../../services/doctors/speciality/listDoctorBySpeciality.service";
import specialitiesDeleteService from "../../services/doctors/speciality/specialitiesDelete.service";
import createSpecialityService from "../../services/doctors/speciality/createSpeciality.service";

const createSpecialityController = async (req: Request, res: Response) => {
  const { name } = req.body;

  const newSpeciality = createSpecialityService(name);

  return res.status(200).json({ newSpeciality });
};

const listAllSpecController = async (req: Request, res: Response) => {
  const listSpecs = await listAllSpecialityService();

  return res.json(listSpecs);
};

const listAllDocsBySpecsController = async (req: Request, res: Response) => {
  const { specId } = req.params;
  const listDocs = await listDoctorBySpecialityService(specId);

  return res.json(listDocs);
};

const specialitiesDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await specialitiesDeleteService(id);

    return res.status(203).send();
  } catch (error) {}
};

export {
  createSpecialityController,
  listAllSpecController,
  listAllDocsBySpecsController,
  specialitiesDeleteController,
};
