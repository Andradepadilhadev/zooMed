import { Species } from "../../entities/species.entity";
import { AppError } from "../../errors/appError";

import { speciesRepository } from "../../utilities";

const createSpeciesServices = async (name: string): Promise<Species> => {
  const species = await speciesRepository.findOneBy({
    name,
  });

  if (species) {
    throw new AppError("Species already exists", 404);
  }

  const createSpecies = speciesRepository.create({
    name: name,
  });

  await speciesRepository.save(createSpecies);

  return createSpecies;
};

export default createSpeciesServices;
