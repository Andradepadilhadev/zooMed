import { speciesRepository } from "../../utilities/repositories";

const listSpeciesServices = async () => {
  const species = await speciesRepository.find();

  return species;
};
export default listSpeciesServices;
