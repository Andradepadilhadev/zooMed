import listAllSpecialityService from "../../services/doctors/speciality/listAllSpeciality.service";
import { Request, Response } from "express";
import listDoctorBySpecialityService from "../../services/doctors/speciality/listDoctorBySpeciality.service";

const listAllSpecController = async (req: Request, res: Response) => {
  const listSpecs = await listAllSpecialityService();

  return res.json(listSpecs);
};

const listAllDocsBySpecsController = async (req: Request, res: Response) => {
  const { specId } = req.params;
  const listDocs = await listDoctorBySpecialityService(specId);

  return res.json(listDocs);
};

export { listAllSpecController, listAllDocsBySpecsController };
