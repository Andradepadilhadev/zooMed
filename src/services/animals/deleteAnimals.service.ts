import { AppError } from "../../errors/appError";
import { animalsRepository } from "../../utilities/repositories";

const deleteAnimalService = async (id: string, userId: string) => {
  const animals = await animalsRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      user: true,
    },
  });

  if (!animals) {
    throw new AppError("Animals not Found", 404);
  }

  if (animals.user.id !== userId) {
    throw new AppError(
      "You don't have authorization to delete this animal",
      409
    );
  }

  await animalsRepository.update(id, {
    isAlive: false,
  });

  return "Animal deleted with success";
};

export default deleteAnimalService;
