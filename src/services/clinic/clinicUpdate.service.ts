import { AppError } from "../../errors/appError";
import { IClinicUpdate } from "../../interfaces/clinic";
import {
  clinicsDoctorsRepository,
  clinicsRepository,
  doctorsRepository,
} from "../../utilities/repositories";
import verifyUUID from "../../utilities/verifyUUID";
import updateAddressService from "../address/updateAddress.service";

const clinicUpdateService = async (
  id: string,
  userId: string,
  { name, contact, crmv_pj, address }: IClinicUpdate
) => {
  verifyUUID(id);

  const findClinic = await clinicsRepository.findOne({
    where: { id: id },
    relations: { address: true },
  });

  if (!findClinic) {
    throw new AppError("Clinic not found", 404);
  }

  const doctor = await doctorsRepository.findOne({
    where: { id: userId },
  });

  const clinicDoctor = await clinicsDoctorsRepository.findOne({
    where: { clinic: { id: findClinic.id }, doctor: { id: doctor!.id } },
    relations: { clinic: true, doctor: true },
  });

  if (clinicDoctor) {
    throw new AppError("You are no longer registered at this clinic", 400);
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
