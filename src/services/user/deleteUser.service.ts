import { usersRepository } from "../../utilities";
import { IUserDelete } from "../../interfaces/users";

const userDeleteService = async ({ isActive }: IUserDelete, id: string) => {
  const findUser = await usersRepository.findOneBy({
    id,
  });

  if (!findUser) {
    // throw new AppError(400, "User not found");
  }

  //   if (!findUser.isActive) {
  //     // throw new AppError(400, "User already inactive(deleted)");
  //   }
  await usersRepository.update(id, {
    isActive: false,
  });
};
export default userDeleteService;
