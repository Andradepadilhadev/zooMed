import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const ensureUUIDMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.user.id;
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  const test = regexExp.test(id);

  if(!test){
    throw new AppError("Invalid id", 400)
  }
};

export default ensureUUIDMiddleware;
