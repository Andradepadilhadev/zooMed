import { AppError } from "../../errors/appError";
import { IClinicRequest } from "../../interfaces/clinic";
import {
  clinicsDoctorsRepository,
  clinicsRepository,
  doctorsRepository,
} from "../../utilities/repositories";
import createAddressService from "../address/createAdrress.service";

const clinicCreateService = async (
  { name, contact, crmv_pj, address }: IClinicRequest,
  userId: string
) => {
  const clinic = await clinicsRepository.findOne({
    where: { name },
  });

  if (clinic) {
    if (clinic.crmv_pj === crmv_pj) {
      throw new AppError("Clinic crmv Already Exists", 409);
    }

    throw new AppError("Clinic name Already Exists", 409);
  }

  const newAddress = await createAddressService(address);

  const newClinic = clinicsRepository.create({
    name,
    contact,
    crmv_pj,
    address: newAddress,
  });

  const doctor = await doctorsRepository.findOne({ where: { id: userId } });

  await clinicsRepository.save(newClinic);

  const clinicDoctor = clinicsDoctorsRepository.create({
    clinic: newClinic,
    doctor: doctor!,
  });

  await clinicsDoctorsRepository.save(clinicDoctor);

  return newClinic;
};
export default clinicCreateService;
