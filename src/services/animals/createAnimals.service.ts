import { Animals } from "../../entities/animals.entity";
import { AppError } from "../../errors/appError";
import { ICreateAnimalsRequest } from "../../interfaces/animals";
import { animalsRepository, usersRepository } from "../../utilities/repositories";
import { speciesRepository } from "../../utilities/repositories";
import { verifyDateFormat } from "../../utilities/verifyDateFormat";

const createAnimalsServices = async (
  { name, birthDate, breed, species }: ICreateAnimalsRequest,
  userId: string
): Promise<Animals> => {

  verifyDateFormat(birthDate)

  const speciesName = await speciesRepository.findOneBy({
    name: species,
  });

  const user = await usersRepository.findOneBy({ id: userId });

  if (!speciesName) {
    throw new AppError("Species not found", 404);
  }

  const createAnimals = animalsRepository.create({
    name: name,
    birthDate: birthDate,
    breed: breed,
    species: speciesName,
    user: user!,
  });

  await animalsRepository.save(createAnimals);

  return createAnimals;
};

export default createAnimalsServices;
