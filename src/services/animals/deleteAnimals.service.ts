import { AppError } from "../../errors/appErros";
import { animalsRepository } from "../../utilities";

const deleteAnimalService = async (id: string) => {
  const animals = await animalsRepository.findOneBy({ id });

  if (!animals) {
    throw new AppError("Animals not Found", 404);
  }

  await animalsRepository.update(id, {
    isAlive: false,
  });

  return "Soft delete done";
};

export default deleteAnimalService;
