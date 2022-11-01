import { usersRepository } from "../../utilities";
import { hash } from "bcrypt";
import { Users } from "../../entities/users.entity";
import { IUserRequest } from "../../interfaces/users";
const updateUserService = async (
  { name, email, password, birthDate }: IUserRequest,
  id: string
): Promise<Users> => {
  const findUser = await usersRepository.findOneBy({
    id,
  });
  if (!findUser) {
    throw new AppError(404, "User not found");
  }

  await usersRepository.update(id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    password: password ? await hash(password!, 10) : findUser.password,
    birthDate: birthDate? findUser.bi
  });
  const user = await usersRepository.findOneBy({
    id,
  });
  return user!;
};
export default updateUserService;
