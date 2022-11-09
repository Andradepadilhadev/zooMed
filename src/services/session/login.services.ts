import { AppError } from "../../errors/appError";
import { IUserLogin } from "../../interfaces/users";
import {
  doctorsRepository,
  usersRepository,
} from "../../utilities/repositories";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const loginService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const user = await usersRepository.findOneBy({ email });

  const doctor = await doctorsRepository.findOneBy({ email });

  if (!user && !doctor) {
    throw new AppError("Invalid email or password", 401);
  }

  if (doctor?.isActive === false || user?.isActive === false) {
    throw new AppError("This account has been removed", 400);
  }

  let matchPass;

  if (user) {
    matchPass = await compare(password, user.password);
  }

  if (doctor) {
    matchPass = await compare(password, doctor.password);
  }

  if (!matchPass) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      id: user ? user.id : doctor!.id,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user ? user.id : doctor!.id,
    }
  );
  return token;
};

export default loginService;
