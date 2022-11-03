import { AppError } from "../../../errors/appError";
import {
  doctorsSpecialitiesRepository,
  specialitiesRepository,
} from "../../../utilities/repositories";

const specialitiesDeleteService = async (id: string) => {
  const specialityAlreadyExists = specialitiesRepository.findOne({
    where: { id: id },
  });
  if (!specialityAlreadyExists) {
    throw new AppError("Speciality not found", 404);
  }

  await specialitiesRepository.delete({ id });
  await doctorsSpecialitiesRepository.delete({ specialtyId: id });

  return;
};
export default specialitiesDeleteService;
