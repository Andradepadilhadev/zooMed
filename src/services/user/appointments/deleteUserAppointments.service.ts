import { AppError } from "../../../errors/appError";
import { appointmentsRepository } from "../../../utilities/repositories";
const appointmentsDeleteService = async (isCanceled: string, id: string) => {
  const findAppointments = await appointmentsRepository.findOneBy({
    id,
  });

  if (!findAppointments) {
    throw new AppError("Appointment not found", 400);
  }
  if (!findAppointments.isCanceled) {
    throw new AppError("User already inactive(deleted)", 400);
  }
  await appointmentsRepository.update(id, {
    isCanceled: true,
  });
};
export default appointmentsDeleteService;
