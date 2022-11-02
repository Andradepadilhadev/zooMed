import { Appointments } from "../../../entities/appointments.entity";
import { appointmentsRepository, usersRepository } from "../../../utilities/repositories";

const listAllUserAppointmentsService = async (
  userId: string
): Promise<Appointments[]> => {
  const user = await usersRepository.findOneBy({ id: userId });
  const appointments = await appointmentsRepository.findBy({
    animals: user!.animals,
  });
  const result = appointments.map((appointments) => appointments);
  return result;
};

export default listAllUserAppointmentsService;
