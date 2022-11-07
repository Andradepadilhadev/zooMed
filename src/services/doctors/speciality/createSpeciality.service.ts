import {
  doctorsRepository,
  doctorsSpecialitiesRepository,
} from "./../../../utilities/repositories";
import { specialitiesRepository } from "../../../utilities/repositories";
import { AppError } from "../../../errors/appError";

const createSpecialityService = async (name: string, doctorId: string) => {
  const specialityAlreadyExists = await specialitiesRepository.findOneBy({
    name,
  });
  const doctor = await doctorsRepository.findOne({
    where: { id: doctorId },
    relations: { doctorSpecialities: { speciality: true } },
  });

  if (specialityAlreadyExists) {
    const specialityDoctor = doctor!.doctorSpecialities.filter(
      (spec) => spec.speciality.name === name
    );

    if (specialityDoctor.length > 0) {
      throw new AppError("Specialty already added", 400);
    }

    const doctorSpeciality = doctorsSpecialitiesRepository.create({
      doctor: doctor!,
      speciality: specialityAlreadyExists,
    });

    await doctorsSpecialitiesRepository.save(doctorSpeciality);

    return {
      message: "Speciality added with success",
      speciality: specialityAlreadyExists,
    };
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
