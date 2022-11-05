import AppDataSource from "../../data-source";
import { Clinics } from "../../entities/clinics.entity";
import { AppError } from "../../errors/appError";
import { IClinicUpdate } from "../../interfaces/clinic";
import updateAddressService from "../address/updateAddress.service";

const clinicUpdateService = async (
  id: string,
  { name, contact, crmv_pj, address }: IClinicUpdate
) => {
  const clinicsRepository = AppDataSource.getRepository(Clinics);
  const findClinic = await clinicsRepository.findOne({
    where: { id: id },
    relations: { address: true },
  });
  if (!findClinic) {
    throw new AppError("Clinic not found", 404);
  }

  if (address) {
    await updateAddressService(address, findClinic.address.id);
  }

  await clinicsRepository.update(
    { id },
    {
      name: name ? name : findClinic.name,
      contact: contact ? contact : findClinic.contact,
      crmv_pj: crmv_pj ? crmv_pj : findClinic.crmv_pj,
      address: findClinic.address,
    }
  );

  const updatedClinic = await clinicsRepository.findOne({
    where: { id: id },
  });

  return updatedClinic;
};
export default clinicUpdateService;
