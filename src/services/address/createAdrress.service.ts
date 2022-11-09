import { Address } from "../../entities/address.entity";
import { AppError } from "../../errors/appError";
import { addressRepository } from "../../utilities/repositories";
import { validateZipCode } from "../../validators";

const createAddressService = async ({
  district,
  zipCode,
  complement,
  number,
  city,
  state,
}: Address): Promise<Address> => {
  const addressAlreadyExists = await addressRepository.findOne({
    where: { district, zipCode, complement, number, city, state },
  });

  await validateZipCode(zipCode);

  if (addressAlreadyExists) {
    throw new AppError("This address is already registered", 409);
  }

  const newAddress = addressRepository.create({
    district: district,
    zipCode: zipCode,
    complement: complement,
    number: number,
    city: city,
    state: state,
  });

  await addressRepository.save(newAddress);

  return newAddress;
};

export default createAddressService;
