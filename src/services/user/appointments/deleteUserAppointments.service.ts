import { appointmentsRepository } from "../../../utilities";

const appointmentsDeleteService = async (id: string) => {
  const findAppointments = await appointmentsRepository.findOneBy({
    id,
  });

  if (!findAppointments) {
    // throw new AppError(400, "User not found");
  }

  //   if (!findUser.isActive) {
  //     // throw new AppError(400, "User already inactive(deleted)");
  //   }

  appointmentsRepository.delete(id);
};
export default appointmentsDeleteService;
