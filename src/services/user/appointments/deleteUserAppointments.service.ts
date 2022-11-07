import { AppError } from "../../../errors/appError";
import { appointmentsRepository } from "../../../utilities/repositories";
import verifyUUID from "../../../utilities/verifyUUID";
const appointmentsDeleteService = async (id: string, userId: string) => {
  verifyUUID(id);

  const findAppointments = await appointmentsRepository.findOne({
    where: { id },
    relations: { animals: { user: true } },
  });

  if (!findAppointments) {
    throw new AppError("Appointment not found", 400);
  }

  const userOwnsTheAppointment = userId === findAppointments.animals.user.id;

  if (!userOwnsTheAppointment) {
    throw new AppError("This is not your appointment", 403);
  }

  if (findAppointments.isCanceled) {
    throw new AppError("Appointment already canceled", 400);
  }
  await appointmentsRepository.update(id, {
    isCanceled: true,
  });
};
export default appointmentsDeleteService;
