import { Animals } from "../../entities/animals.entity";
import { AppError } from "../../errors/appError";
import { ICreateAnimalsRequest } from "../../interfaces/animals";
import {
  animalsRepository,
  usersRepository,
} from "../../utilities/repositories";
import { speciesRepository } from "../../utilities/repositories";
import { verifyDateFormat } from "../../utilities/verifyDateFormat";
import { verifyOwnerUser } from "../../utilities/verifyOwnerUser";

const createAnimalsServices = async (
  { name, birthDate, breed, species }: ICreateAnimalsRequest,
  userId: string
): Promise<Animals> => {
  await verifyOwnerUser(userId);
  verifyDateFormat(birthDate);

  const speciesName = await speciesRepository.findOneBy({
    name: species,
  });

  const user = await usersRepository.findOne({
    where: { id: userId },
    relations: { animals: true },
  });

  if (!speciesName) {
    throw new AppError("Species not found", 404);
  }

  const animalAlreadyExists = user!.animals.filter(
    (animal) => animal.name === name
  );

  if (animalAlreadyExists) {
    throw new AppError("You already registered this animal", 409);
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
