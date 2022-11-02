import { usersRepository } from "../../utilities";
import { hash } from "bcrypt";
import { Users } from "../../entities/users.entity";
import { IUserRequest } from "../../interfaces/users";
import { AppError } from "../../errors/appError";
const updateUserService = async (
  { name, email, password, birthDate }: IUserRequest,
  id: string
): Promise<Users> => {
  const findUser = await usersRepository.findOneBy({
    id,
  });
  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  await usersRepository.update(id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    birthDate: birthDate ? birthDate : findUser.birthDate,
    password: password ? await hash(password!, 10) : findUser.password,
  });
  const user = await usersRepository.findOneBy({
    id,
  });
  return user!;
};
export default updateUserService;
