import { Animals } from "../../entities/animals.entity";
import { usersRepository } from "../../utilities/repositories";
import { verifyOwnerUser } from "../../utilities/verifyOwnerUser";

const listAllAnimalsUserService = async (
  userId: string
): Promise<Animals[]> => {
  await verifyOwnerUser(userId);

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
