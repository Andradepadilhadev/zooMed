import { AppError } from "../errors/appError";

const verifyAge = (birthDate: string): void => {
  const today = new Date();
  const birth = new Date(birthDate);

  let calculateAge = today.getFullYear() - birth.getFullYear();
  const age = today.getMonth() - birth.getMonth();

  if (age < 18 || (age === 18 && today.getDate() < birth.getDate())) {
    calculateAge--
  }

  if(calculateAge < 18){
    throw new AppError("Invalid age", 400)
  }
};

export { verifyAge };
