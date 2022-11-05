import { Address } from "../../entities/address.entity";
import { addressRepository } from "../../utilities/repositories";

const createAddressService = async (address: Address): Promise<Address> => {
  const newAddress = await addressRepository.create({
    district: address.district,
    zipCode: address.zipCode,
    complement: address.complement,
    number: address.number,
    city: address.city,
    state: address.state,
  });

  await addressRepository.save(newAddress);

  return newAddress;
};

export default createAddressService;
