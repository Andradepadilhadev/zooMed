import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";
import { addressRepository } from "../utilities";

const ensureUniqueAddressMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

    const addressFound = await addressRepository.findOneBy({
        zipCode: req.body.zipCode,
        number: req.body.number,
        complement: req.body.complement,
        district: req.body.district,
        city: req.body.city,
        state: req.body.state
    })

    if(addressFound){
        throw new AppError("This address already exists")
    }

    return next()
};

export default ensureUniqueAddressMiddleware;