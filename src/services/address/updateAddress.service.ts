import { Address } from "../../entities/address.entity";
import { addressRepository } from "../../utilities/repositories";

const updateAddressService = async (
  address: Address
): Promise<Partial<Address>> => {
  await addressRepository.update(address.id, {
    zipCode: address.zipCode,
    number: address.number,
    complement: address.complement,
    district: address.district,
    city: address.city,
    state: address.state,
  });

  return {
    zipCode: address.zipCode,
    number: address.number,
    complement: address.complement,
    district: address.district,
    city: address.city,
    state: address.state,
  };
};

export default updateAddressService;
