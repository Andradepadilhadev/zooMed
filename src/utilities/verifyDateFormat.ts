import { AppError } from "../errors/appError";

export const verifyDateFormat = (date: string): void => {
  const dateArray = date.split("/");
  if (
    dateArray.length !== 3 ||
    dateArray[0].length !== 4 ||
    Number(dateArray[1]) < 1 ||
    Number(dateArray[1]) > 12 ||
    Number(dateArray[2]) < 1 ||
    Number(dateArray[2]) > 31
  ) {
    throw new AppError("Invalid Date. Should be YYYY/MM/DD.", 400);
  }
};
