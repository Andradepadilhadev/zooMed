import { AppError } from "../../../errors/appError";
import {
  doctorsSpecialitiesRepository,
  specialitiesRepository,
} from "../../../utilities/repositories";

const specialitiesDeleteService = async (id: string, userId: string) => {
  const specialityAlreadyExists = specialitiesRepository.findOne({

    where: { id: id },
  });

  if (!specialityAlreadyExists) {
    throw new AppError("Speciality not found", 404);
  }

  const specialityDoctorExists = await doctorsSpecialitiesRepository.findOneBy({
    speciality: { id },
    doctor: { id: userId },
  });

  if (!specialityDoctorExists) {
    throw new AppError("Speciality has already been removed", 400);
  }

  await doctorsSpecialitiesRepository.delete({
    speciality: { id },
    doctor: { id: userId },

  });

  return { message: "Speciality has been removed" };
};
export default specialitiesDeleteService;
