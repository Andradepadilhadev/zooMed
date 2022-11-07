import { Appointments } from "../../../entities/appointments.entity";
import {
  appointmentsRepository,
  usersRepository,
} from "../../../utilities/repositories";

const listAllUserAppointmentsService = async (
  userId: string
): Promise<Appointments[]> => {
  const user = await usersRepository.findOneBy({ id: userId });
  const appointments = await appointmentsRepository.find({
    where: { animals: user!.animals },
    relations: { clinicsDoctors: { doctor: true, clinic: true } },
  });
  return appointments;
};

export default listAllUserAppointmentsService;
