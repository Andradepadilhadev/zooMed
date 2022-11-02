import { AppError } from "../errors/appError";

const verifyReviewDate = (date: string): void => {
  const today = new Date();
  const scheduling = new Date(date);

  if (today.getDate() < scheduling.getDate()) {
    throw new AppError("Unauthorized", 401);
  }
};

export { verifyReviewDate };
