import { usersRepository } from "../../utilities/repositories";
import { AppError } from "../../errors/appError";

const userDeleteService = async (id: string) => {
  const findUser = await usersRepository.findOneBy({
    id,
  });

  if (!findUser!.isActive) {
    throw new AppError("User already inactive", 400);
  }

  await usersRepository.update(id, {
    isActive: false,
  });

  return { message: "User deleted successfully" };
};

export default userDeleteService;
