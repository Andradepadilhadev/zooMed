import { Doctors } from "../../../entities/doctors.entity";
import { AppError } from "../../../errors/appError";
import {
  doctorsRepository,
  specialitiesRepository,
} from "../../../utilities/repositories";

const listDoctorBySpecialityService = async (
  id: string
): Promise<Doctors[]> => {
  const speciality = await specialitiesRepository.findBy({
    id: id,
  });

  if (!speciality) {
    throw new AppError("Speciality not found", 400);
  }

  const doctors = await doctorsRepository.find({
    where: { doctorSpecialities: { speciality: { id } } },
    relations: { doctorSpecialities: { speciality: true } },
  });

  return doctors;
};
export default listDoctorBySpecialityService;
