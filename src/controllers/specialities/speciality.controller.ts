import listAllSpecialityService from "../../services/doctors/speciality/listAllSpeciality.service";
import { Request, Response } from "express";
import listDoctorBySpecialityService from "../../services/doctors/speciality/listDoctorBySpeciality.service";
import specialitiesDeleteService from "../../services/doctors/speciality/specialitiesDelete.service";
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
  listAllSpecController,
  listAllDocsBySpecsController,
  specialitiesDeleteController,
};
