import { Animals } from "../../entities/animals.entity";
import { usersRepository } from "../../utilities";

const listAllAnimalsUserService = async (
  userId: string
): Promise<Animals[]> => {
  const user = await usersRepository.findOneBy({ id: userId });
  const result = user!.animals.map((animal) => animal);
  return result;
};

export default listAllAnimalsUserService;
