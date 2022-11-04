import { Specialities } from "../../../entities/specialities.entity";
import { specialitiesRepository } from "../../../utilities/repositories";

const listAllSpecialityService = async (): Promise<Specialities[]> => {
  const specs = await specialitiesRepository.find();
  const result = specs.map((spec) => spec);
  return result;
};
export default listAllSpecialityService;
