import { AppError } from "../../errors/appError";
import { IUserLogin } from "../../interfaces/users";
import { usersRepository } from "../../utilities/repositories";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const loginService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const user = await usersRepository.findOneBy({ email: email });

  if (!user) {
    throw new AppError("Invalid email or password", 403);
  }

  const matchPass = await compare(password, user.password);

  if (!matchPass) {
    throw new AppError("Invalid email or password", 403);
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
      subject: user.id,
    }
  );
  return token;
};

export default loginService;
