import {
  doctorsRepository,
  doctorsSpecialitiesRepository,
} from "./../../../utilities/repositories";
import { AppError } from "../../../errors/appError";
import { specialitiesRepository } from "../../../utilities/repositories";

const createSpecialityService = async (name: string, doctorId: string) => {
  const specialityAlreadyExists = await specialitiesRepository.findOneBy({
    name,
  });
  const doctor = await doctorsRepository.findOneBy({ id: doctorId });

  if (specialityAlreadyExists) {
    const doctorSpeciality = doctorsSpecialitiesRepository.create({
      doctor: doctor!,
      speciality: specialityAlreadyExists,
    });

    await doctorsSpecialitiesRepository.save(doctorSpeciality);
  }

  const newSpeciality = specialitiesRepository.create({ name });

  await specialitiesRepository.save(newSpeciality);

  const doctorSpeciality = doctorsSpecialitiesRepository.create({
    doctor: doctor!,
    speciality: newSpeciality,
  });

  await doctorsSpecialitiesRepository.save(doctorSpeciality);

  return {
    message: "Speciality added with success",
    speciality: newSpeciality,
  };
};

export default createSpecialityService;
