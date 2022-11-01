import { AppError } from "../../errors/appErros";
import {
  ICreateAnimalsResponse,
  ICreateAnimalsRequest,
} from "../../interfaces/animals";
import { animalsRepository } from "../../utilities";
import { usersRepository } from "../../utilities";
import { speciesRepository } from "../../utilities";

const createAnimalsServices = async ({
  name,
  birthDate,
  breed,
  speciesId,
}: ICreateAnimalsRequest): Promise<ICreateAnimalsResponse> => {
  const speciesAlredyExits = await speciesRepository.findOneBy({
    id: speciesId,
  });

  if (!speciesAlredyExits) {
    throw new AppError("Species not found", 404);
  }

  const createAnimals = animalsRepository.create({
    name: name,
    birthDate: birthDate,
    breed: breed,
    species: speciesAlredyExits,
  });

  await animalsRepository.save(createAnimals);

  return createAnimals;
};

export default createAnimalsServices;
