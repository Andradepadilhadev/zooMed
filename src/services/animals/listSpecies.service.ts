import { speciesRepository } from "../../utilities";

const listSpeciesServices = async () => {
  const species = await speciesRepository.find();

  return species;
};
export default listSpeciesServices;
