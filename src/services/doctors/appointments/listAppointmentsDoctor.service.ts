import { appointmentsRepository } from "../../../utilities/repositories";

const listAppointmentsDoctorService = async (id: string) => {
  const appointmentsDoctor = await appointmentsRepository.find({
    where: { clinicsDoctors: { doctor: { id } } },
  });

  if (appointmentsDoctor.length === 0) {
    return { message: "You don't have any appointments" };
  }

  return appointmentsDoctor;
};

export default listAppointmentsDoctorService;
