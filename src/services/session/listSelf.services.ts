import {
  doctorsRepository,
  usersRepository,
} from "../../utilities/repositories";

const listSelfService = async (id: string) => {
  const user = await usersRepository.findOneBy({ id });

  const doctor = await doctorsRepository.findOneBy({ id });

  return user ? user : doctor;
};

export default listSelfService;
