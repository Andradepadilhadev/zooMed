import { AppError } from "../../../errors/appError";
import { appointmentsRepository } from "../../../utilities/repositories";
const appointmentsDeleteService = async (id: string) => {
  const findAppointments = await appointmentsRepository.findOneBy({
    id,
  });

  if (!findAppointments) {
    throw new AppError("Appointment not found", 400);
  }

  appointmentsRepository.delete(id);
};
export default appointmentsDeleteService;
