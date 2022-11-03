import { usersRepository } from "./repositories";
import { AppError } from "../errors/appError";

const verifyOwnerUser = async (user_id: string): Promise<void> => {
  const user = await usersRepository.findOneBy({
    id: user_id,
  });

  if (!user) {
    throw new AppError("Unauthorized", 401);
  }
};

export { verifyOwnerUser };
