import AppDataSource from "../../data-source";
import { ClinicsDoctors } from "../../entities/clinicsDoctors.entity";
import { Clinics } from "../../entities/clinics.entity";
import { Address } from "../../entities/address.entity";

const clinicDeleteService = async (id: string) => {
  const clinicRepository = AppDataSource.getRepository(Clinics);
  const addressRepository = AppDataSource.getRepository(Address);

  const clinicAlreadyExists = await clinicRepository.findOne({
    where: { id: id },
  });
  if (!clinicAlreadyExists) {
    throw new Error("Clinic not found");
  }

  const addressId = clinicAlreadyExists.address.id;

  await clinicRepository.delete(id);
  await addressRepository.delete({ id: addressId });
  return;
};
export default clinicDeleteService;
