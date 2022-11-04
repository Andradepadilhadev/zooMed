import { doctorsRepository } from "../../utilities/repositories";

const listDoctorsService = async () => {
  const allDoctors = await doctorsRepository.find();

  return allDoctors;
};

export default listDoctorsService;
