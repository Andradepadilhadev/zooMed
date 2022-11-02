import { IUserRequest } from "../../interfaces/users";
import { Users } from "../../entities/users.entity";
import { hash } from "bcrypt";
import {
  animalsRepository,
  handleDate,
  noPasswordReturn,
  usersRepository,
} from "../../utilities/repositories";
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
    birthDate: new Date(handleDate(birthDate)),
    password: hashedPassword,
  });
  const userExist = await usersRepository.findOneBy({
    name,
    email,
  });

  if (userExist) {
    //   throw new AppError(400, "User e-mail or name is already registred");
  }

  await usersRepository.save(newUser);

  return newUser;
};

export default createUserService;
