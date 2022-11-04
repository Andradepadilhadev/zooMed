import { IUserRequest } from "../../interfaces/users";
import { Users } from "../../entities/users.entity";
import { hash } from "bcryptjs";
import { usersRepository } from "../../utilities/repositories";
import { AppError } from "../../errors/appError";

const createUserService = async ({
  name,
  email,
  birthDate,
  password,
}: IUserRequest): Promise<Users> => {
  if (!password) {
    throw new AppError("Password is missing", 400);
  }
  const hashedPassword = await hash(password, 10);

  const newUser = usersRepository.create({
    name,
    email,
    birthDate,
    password: hashedPassword,
  });
  const userAlreadyExists = await usersRepository.findOneBy({
    email,
  });

  if (userAlreadyExists) {
    throw new AppError("Email is already exists", 409);
  }

  await usersRepository.save(newUser);

  return newUser;
};

export default createUserService;
