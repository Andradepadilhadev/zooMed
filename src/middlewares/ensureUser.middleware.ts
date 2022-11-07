import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";
import { usersRepository } from "../utilities/repositories";

const ensureUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.user.id;
  const userFound = await usersRepository.findOneBy({
    id: id,
  });

  if (!userFound) {
    throw new AppError("You are not a user", 403);
  }

  return next();
};

export default ensureUserMiddleware;
