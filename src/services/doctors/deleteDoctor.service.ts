import { AppError } from "../../errors/appError";
import { doctorsRepository } from "../../utilities/repositories";

const deleteDoctorService = async (id: string) => {
  const findUser = await doctorsRepository.findOneBy({
    id,
  });

  if (!findUser) {
    throw new AppError("User not found", 400);
  }

  if (!findUser.isActive) {
    throw new AppError("User already inactive", 400);
  }

  await doctorsRepository.update(id, {
    isActive: false,
  });
};
export default deleteDoctorService;
