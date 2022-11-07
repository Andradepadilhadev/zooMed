import { doctorsRepository } from "../../utilities/repositories";

const listDoctorsService = async () => {
  const allDoctors = await doctorsRepository.find({
    relations: {
      clinicsDoctors: { clinic: true },
      doctorSpecialities: { speciality: true },
    },
  });

  return allDoctors;
};

export default listDoctorsService;
