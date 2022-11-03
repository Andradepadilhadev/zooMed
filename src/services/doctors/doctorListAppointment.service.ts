import { AppError } from "../../errors/appError";
import { clinicsDoctorsRepository } from "../../utilities/repositories";

const doctorListAppointmentService = async (id: string) => {
  const doctorAlreadyExists = await clinicsDoctorsRepository.find({
    where: { id: id },
  });
  if (!doctorAlreadyExists) {
    throw new AppError("Doctor not found", 404);
  }
  const listAppointments = doctorAlreadyExists.map((list) => list.appointments);

  return listAppointments;
};
export default doctorListAppointmentService;
