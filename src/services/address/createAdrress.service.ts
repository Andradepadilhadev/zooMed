import { Address } from "../../entities/address.entity";
import { addressRepository } from "../../utilities/repositories";

const createAddressService = async (address: Address): Promise<Address> => {
  const newAddress = addressRepository.create({
    district: address.district,
    zipCode: address.zipCode,
    complement: address.complement,
    number: address.number,
    city: address.city,
    state: address.state,
  });

  return newAddress;
};

export default createAddressService;
