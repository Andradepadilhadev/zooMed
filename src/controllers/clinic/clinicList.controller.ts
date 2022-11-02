import { Request, Response } from "express";
import clinicListService from "../../services/clinic/clinicList.service";

const clinicListController = async (req: Request, res: Response) => {
  try {
    const listed = await clinicListService();
    return res.status(200).send(listed);
  } catch (error) {}
};
export default clinicListController;
