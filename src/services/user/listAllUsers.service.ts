import { Users } from "../../entities/users.entity";
import { usersRepository } from "../../utilities/repositories";

const listAllUserService = async (): Promise<Users[]> => {
  const users = await usersRepository.find();
  const result = users.map((user) => user);
  return result;
};

export default listAllUserService;
