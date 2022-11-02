import AppDataSource from "../../data-source";
import { ClinicsDoctors } from "../../entities/clinicsDoctors.entity";
import { Clinics } from "../../entities/clinics.entity";

const clinicDeleteService = async (id: string) => {
  const clinicRepository = AppDataSource.getRepository(Clinics);

  const clinicAlreadyExists = await clinicRepository.findOne({
    where: { id: id },
  });
  if (!clinicAlreadyExists) {
    throw new Error("Clinic not found");
  }

  await clinicRepository.delete(id);
  return;
};
export default clinicDeleteService;
