import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";
import { doctorsRepository } from "../utilities";

const ensureDoctorMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.user.id;
  const doctorFound = await doctorsRepository.findOneBy({
    id: id,
  });

  if (!doctorFound) {
    throw new AppError("User is not doctor", 403);
  }
  return next();
};

export default ensureDoctorMiddleware;
