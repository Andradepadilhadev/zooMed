import AppDataSource from "../../data-source";
import { Clinics } from "../../entities/clinics.entity";
import { AppError } from "../../errors/appError";
import { IClinicRequest } from "../../interfaces/clinic";
import createAddressService from "../address/createAdrress.service";

const clinicCreateService = async ({
  name,
  contact,
  crmv_pj,
  address,
}: IClinicRequest) => {
  const clinicRepository = AppDataSource.getRepository(Clinics);

  const clinicAlreadyExists = await clinicRepository.findOne({
    where: { name: name },
  });
  if (clinicAlreadyExists) {
    throw new AppError("Clinic Already Exists", 404);
  }

  const newClinic = new Clinics();
  newClinic.name = name;
  newClinic.contact = contact;
  newClinic.address = await createAddressService(address);
  crmv_pj && (newClinic.crmv_pj = crmv_pj);

  clinicRepository.create(newClinic);
  await clinicRepository.save(newClinic);

  return newClinic;
};
export default clinicCreateService;
