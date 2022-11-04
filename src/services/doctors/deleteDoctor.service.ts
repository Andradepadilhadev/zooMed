import { AppError } from "../../errors/appError";
import { doctorsRepository } from "../../utilities/repositories";

const deleteDoctorService = async (id: string) => {
  const doctorAlreadyExists = await doctorsRepository.findOneBy({
    id,
  });

  if (!doctorAlreadyExists) {
    throw new AppError("Doctor not found", 400);
  }

  if (!doctorAlreadyExists.isActive) {
    throw new AppError("Doctor already inactive", 400);
  }

  await doctorsRepository.update(id, {
    isActive: false,
  });
};
export default deleteDoctorService;
