import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Clinics } from "../../entities/clinics.entity";
import { AppError } from "../../errors/appError";
import { IClinicRequest } from "../../interfaces/clinic";

const clinicCreateService = async ({
  name,
  contact,
  crmv_pj,
  address,
}: IClinicRequest) => {
  const clinicRepository = AppDataSource.getRepository(Clinics);
  const addressRepository = AppDataSource.getRepository(Address);
  if (crmv_pj) {
    const clinicList = await clinicRepository.findOne({
      where: { crmv_pj: crmv_pj },
    });
    if (clinicList) {
      throw new AppError("Clinic Already Exists", 404);
    }

    const newAddress = new Address();
    newAddress.zipCode = address.zipCode;
    newAddress.city = address.city;
    newAddress.complement = address.complement;
    newAddress.state = address.state;
    newAddress.district = address.district;
    newAddress.number = address.number;

    addressRepository.create(newAddress);
    await addressRepository.save(newAddress);

    const newClinic = new Clinics();
    newClinic.name = name;
    newClinic.contact = contact;
    newClinic.address = newAddress;
    newClinic.crmv_pj = crmv_pj;

    clinicRepository.create(newClinic);
    await clinicRepository.save(newClinic);

    return {
      message: "Created sucessfully",
      Clinic: newClinic,
    };
  }
  const newAddress = new Address();
  newAddress.zipCode = address.zipCode;
  newAddress.city = address.city;
  newAddress.complement = address.complement;
  newAddress.state = address.state;
  newAddress.district = address.district;
  newAddress.number = address.number;

  addressRepository.create(newAddress);
  await addressRepository.save(newAddress);

  const newClinic = new Clinics();
  newClinic.name = name;
  newClinic.contact = contact;
  newClinic.address = newAddress;

  clinicRepository.create(newClinic);
  await clinicRepository.save(newClinic);

  return {
    message: "Created sucessfully",
    Clinic: newClinic,
  };
};
export default clinicCreateService;
