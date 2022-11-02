import { Request, Response } from "express";
import clinicUpdateService from "../../services/clinic/clinicUpdate.service";

const clinicUpdateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, contact, crmv_pj, address, clinicsDoctors } = req.body;
    const clinicUpdated = await clinicUpdateService(id, {
      name,
      contact,
      crmv_pj,
      address,
      clinicsDoctors,
    });

    return res.status(200).send(clinicUpdated);
  } catch (error) {}
};
export default clinicUpdateController;
