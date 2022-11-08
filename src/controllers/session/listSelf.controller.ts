import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listSelfService from "../../services/session/listSelf.services";

const listSelfController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const listSelf = await listSelfService(id);

  return res.status(200).json(instanceToPlain(listSelf));
};

export default listSelfController;
