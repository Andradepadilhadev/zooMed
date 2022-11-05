import { Animals } from "../../entities/animals.entity";
import { usersRepository } from "../../utilities/repositories";

const listAllAnimalsUserService = async (
  userId: string
): Promise<Animals[]> => {
  const user = await usersRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      animals: true,
    },
  });
  return user!.animals;
};

export default listAllAnimalsUserService;
