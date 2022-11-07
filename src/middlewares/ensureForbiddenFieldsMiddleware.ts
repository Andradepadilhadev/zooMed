import { Request, Response, NextFunction } from "express";

const ensureForbiddenFieldsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.hasOwnProperty("id") || req.body.hasOwnProperty("isActive")) {
    return res.status(403).json({
      message: "Cannot update id or isActive",
    });
  }

  return next();
};

export default ensureForbiddenFieldsMiddleware;
