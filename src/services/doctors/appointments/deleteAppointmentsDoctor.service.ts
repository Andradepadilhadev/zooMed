import { AppError } from "../../../errors/appError";
import { appointmentsRepository } from "./../../../utilities/repositories";
const deleteAppointmentDoctorService = async (id: string) => {
  const appointmentExists = await appointmentsRepository.findOne({
    where: { id: id },
  });

  if (!appointmentExists) {
    throw new AppError("Appointment not found", 404);
  }

  await appointmentsRepository.delete({ id });

  return;
};
export default deleteAppointmentDoctorService;
