import { usersRepository } from "../../utilities/repositories";
import { AppError } from "../../errors/appError";
import verifyUUID from "../../utilities/verifyUUID";


const userDeleteService = async (loggedId: string, userId: string) => {
  verifyUUID(userId);

  if (loggedId !== userId) {
    throw new AppError("Not your profile to update", 403);
  }

  const findUser = await usersRepository.findOneBy({
    id: loggedId,
  });

  if (!findUser!.isActive) {
    throw new AppError("User already inactive", 400);
  }

  await usersRepository.update(loggedId, {
    isActive: false,
  });

  return { message: "User deleted successfully" };
};

export default userDeleteService;
