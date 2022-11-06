import { clinicsDoctorsRepository } from "./../../../utilities/repositories";
import { Appointments } from "../../../entities/appointments.entity";
import { AppError } from "../../../errors/appError";
import { IAppointmentsRequest } from "../../../interfaces/users";
import {
  animalsRepository,
  appointmentsRepository,
} from "../../../utilities/repositories";

const createAppointmentsService = async ({
  date,
  hour,
  animalsId,
  doctorId,
}: IAppointmentsRequest): Promise<Partial<Appointments>> => {
  const clinicDoctor = await clinicsDoctorsRepository.findOneBy({id: doctorId });
  const animal = await animalsRepository.findOneBy({ id: animalsId });

  if (!clinicDoctor || !animal) {
    throw new AppError("Not found, doctor or animal", 400);
  }
  const newAppointments = new Appointments();
  newAppointments.date = date;
  newAppointments.hour = hour;
  newAppointments.animals = animal;
  newAppointments.clinicsDoctors = clinicDoctor;

  appointmentsRepository.save(newAppointments);

  return newAppointments;
};

export default createAppointmentsService;
