import { usersRepository } from "../../utilities";
import { IUserDelete } from "../../interfaces/users";
import { AppError } from "../../errors/appError";

const userDeleteService = async ({ isActive }: IUserDelete, id: string) => {
  const findUser = await usersRepository.findOneBy({
    id,
  });

  if (!findUser) {
    throw new AppError("User not found", 400);
  }

  if (!findUser.isActive) {
    throw new AppError("User already inactive(deleted)", 400);
  }

  await usersRepository.update(id, {
    isActive: false,
  });
};
export default userDeleteService;
