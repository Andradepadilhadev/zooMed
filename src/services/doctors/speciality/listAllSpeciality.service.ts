import { Specialities } from "../../../entities/specialities.entity";
import { specialitiesRepository } from "../../../utilities/repositories";

const listAllSpecialityService = async (): Promise<Specialities[]> => {
  const specs = await specialitiesRepository.find();
  return specs.map((spec) => spec);
};
export default listAllSpecialityService;
