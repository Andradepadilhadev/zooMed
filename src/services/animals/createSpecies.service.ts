import { Species } from "../../entities/species.entity";
import { AppError } from "../../errors/appError";
import { speciesRepository } from "../../utilities/repositories";

const createSpeciesServices = async (name: string): Promise<Species> => {
  const species = await speciesRepository.findOneBy({
    name,
  });

  if (species) {
    throw new AppError("Species already exists", 409);
  }

  const createSpecies = speciesRepository.create({
    name: name,
  });

  await speciesRepository.save(createSpecies);

  return createSpecies;
};

export default createSpeciesServices;
