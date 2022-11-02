import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const ensureForbiddenFieldsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    req.body.hasOwnProperty("id") ||
    req.body.hasOwnProperty("isActive") ||
    req.body.hasOwnProperty("id")
  ) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

export default ensureForbiddenFieldsMiddleware;
