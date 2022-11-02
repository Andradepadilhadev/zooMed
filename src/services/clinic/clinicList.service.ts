import AppDataSource from "../../data-source";
import { Clinics } from "../../entities/clinics.entity";

const clinicListService = async () => {
  const clinicRepository = AppDataSource.getRepository(Clinics);
  const clinicList = await clinicRepository.find();

  return clinicList;
};
export default clinicListService;
