import { Doctors } from "../../../entities/doctors.entity";
import { AppError } from "../../../errors/appError";
import {
  doctorsRepository,
  specialitiesRepository,
} from "../../../utilities/repositories";

const listDoctorBySpecialityService = async (
  specId: string
): Promise<Doctors[]> => {
  const spec = await specialitiesRepository.findBy({
    id: specId,
  });
  if (!spec) {
    throw new AppError("Speciality not found", 400);
  }
  const doctors = await doctorsRepository.findBy({
    doctorSpecialities: spec,
  });
  return doctors;
};
export default listDoctorBySpecialityService;
