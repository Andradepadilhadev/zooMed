import { AppError } from "../../../errors/appError";
import { specialitiesRepository } from "../../../utilities/repositories";

const createSpecialityService = async (name: string) => {
  const specialityAlreadyExists = await specialitiesRepository.findOneBy({
    name,
  });

  if (specialityAlreadyExists) {
    return new AppError("Speciality already exists", 400);
  }

  const newSpeciality = specialitiesRepository.create({ name });

  await specialitiesRepository.save(newSpeciality);

  return newSpeciality;
};

export default createSpecialityService;
