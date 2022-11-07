import { AppError } from "../errors/appError";
import { validate as uuidValidate } from "uuid";

const verifyUUID = (id: string) => {
  if (!uuidValidate(id)) {
    throw new AppError("Invalid id", 400);
  }
};

export default verifyUUID;
