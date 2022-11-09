import { Address } from "../../entities/address.entity";
import { addressRepository } from "../../utilities/repositories";

const updateAddressService = async (
  address: Partial<Address>,
  id: string
): Promise<void> => {
  const addressToBeUpdated = await addressRepository.findOneBy({ id });

  await addressRepository.update(id, {
    zipCode: address.zipCode ? address.zipCode : addressToBeUpdated!.zipCode,
    number: address.number ? address.number : addressToBeUpdated!.number,
    complement: address.complement ? address.complement : addressToBeUpdated!.complement,
    district: address.district ? address.district : addressToBeUpdated!.district,
    city: address.city ? address.city : addressToBeUpdated!.city,
    state: address.state ? address.state : addressToBeUpdated!.state,
  });
  
};

export default updateAddressService;
