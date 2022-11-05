import { Specialities } from "../../../entities/specialities.entity";
import { specialitiesRepository } from "../../../utilities/repositories";

const listAllSpecialitiesService = async (): Promise<Specialities[]> => {
  const specialities = await specialitiesRepository.find();
  return specialities;
};
export default listAllSpecialitiesService;
