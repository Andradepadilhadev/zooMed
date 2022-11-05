import { AppError } from "../../errors/appError";
import { speciesRepository } from "../../utilities/repositories";

const updateSpeciesService = async (name: string, id: string) => {
  const findSpecies = await speciesRepository.findOneBy({ id });

  if (!name) {
    throw new AppError("Name field required", 400);
  }

  if (!findSpecies) {
    throw new AppError("Species not found", 404);
  }

  await speciesRepository.update(id, {
    name: name ? name : findSpecies.name,
  });

  const species = await speciesRepository.findOneBy({ id });

  return species;
};

export default updateSpeciesService;
