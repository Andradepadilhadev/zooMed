import { AppError } from "../../../errors/appError";
import verifyUUID from "../../../utilities/verifyUUID";
import { appointmentsRepository } from "./../../../utilities/repositories";
const deleteAppointmentDoctorService = async (id: string, doctorId: string) => {
  verifyUUID(id);

  const appointmentExists = await appointmentsRepository.findOne({
    where: { id: id },
    relations: { clinicsDoctors: { doctor: true } },
  });

  if (!appointmentExists) {
    throw new AppError("Appointment not found", 404);
  }

  const appointmentBelongsToDoctor =
    doctorId === appointmentExists.clinicsDoctors.doctor.id;

  if (!appointmentBelongsToDoctor) {
    throw new AppError("This is not your appointment to cancel", 403);
  }

  await appointmentsRepository.delete({ id });

  return { message: "Appointment canceled successfully" };
};
export default deleteAppointmentDoctorService;
