import { Users } from "../../entities/users.entity";
import { usersRepository } from "../../utilities/repositories";

const listAllUserService = async (): Promise<Users[]> => {
  console.log('1')
  const users = await usersRepository.find();
  console.log('2')
  return users;
};

export default listAllUserService;
