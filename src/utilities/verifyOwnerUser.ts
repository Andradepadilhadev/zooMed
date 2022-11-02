import { usersRepository } from ".";
import { AppError } from "../errors/appError";
import { ICreateAnimalsRequest } from "../interfaces/animals";

const verifyOwnerUser = async ({
  user_id,
}: ICreateAnimalsRequest): Promise<void> => {
  const user = await usersRepository.findOneBy({
    id: user_id,
  });

  if (!user) {
    throw new AppError("Unauthorized", 401);
  }
};

export { verifyOwnerUser };

