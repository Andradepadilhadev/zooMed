import { Animals } from "../../entities/animals.entity";
import { AppError } from "../../errors/appError";
import { ICreateAnimalsRequest } from "../../interfaces/animals";
import { animalsRepository, usersRepository } from "../../utilities/repositories";
import { speciesRepository } from "../../utilities/repositories";

const createAnimalsServices = async (
  { name, birthDate, breed, speciesId }: ICreateAnimalsRequest,
  userId: string
): Promise<Animals> => {
  const species = await speciesRepository.findOneBy({
    id: speciesId,
  });

  const user = await usersRepository.findOneBy({ id: userId });

  if (!species) {
    throw new AppError("Species not found", 404);
  }

  const createAnimals = animalsRepository.create({
    name: name,
    birthDate: birthDate,
    breed: breed,
    species: species,
    user: user!,
  });

  await animalsRepository.save(createAnimals);

  return createAnimals;
};

export default createAnimalsServices;
