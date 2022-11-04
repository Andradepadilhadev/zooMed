import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const ensureForbiddenFieldsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.hasOwnProperty("id") || req.body.hasOwnProperty("isActive")) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  return next();
};

export default ensureForbiddenFieldsMiddleware;
