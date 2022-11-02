import { Appointments } from "../../../entities/appointments.entity";
import { AppError } from "../../../errors/appError";
import { IAppointmentsRequest } from "../../../interfaces/users";
import {
  animalsRepository,
  appointmentsRepository,
  doctorsRepository,
  usersRepository,
} from "../../../utilities";

const createAppointmentsService = async ({
  date,
  hour,
  animalsId,
  doctorId,
}: IAppointmentsRequest): Promise<Partial<Appointments>> => {
  const doctor = await doctorsRepository.findOneBy({ id: doctorId });
  const animal = await animalsRepository.findOneBy({ id: animalsId });

  if (!doctor || !animal) {
    throw new AppError("Not found, doctor or animal", 400);
  }
  const newAppointments = {
    date,
    hour,
    animal: animal,
    clinicsDoctorsId: doctor!.id,
  };
  appointmentsRepository.save(newAppointments);

  return newAppointments;
};

export default createAppointmentsService;
