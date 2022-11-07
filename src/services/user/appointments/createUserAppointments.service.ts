import { verifyDateFormat } from "./../../../utilities/verifyDateFormat";
import { clinicsDoctorsRepository } from "./../../../utilities/repositories";
import { Appointments } from "../../../entities/appointments.entity";
import { AppError } from "../../../errors/appError";
import { IAppointmentsRequest } from "../../../interfaces/users";
import {
  animalsRepository,
  appointmentsRepository,
} from "../../../utilities/repositories";
import { verifyAppointmentDate } from "../../../utilities/verifyAppointmentDate";
import verifyUUID from "../../../utilities/verifyUUID";

const createAppointmentsService = async ({
  date,
  hour,
  animalId,
  clinicsDoctorsId,
}: IAppointmentsRequest): Promise<Partial<Appointments>> => {
  verifyDateFormat(date);
  verifyAppointmentDate(date, hour);
  verifyUUID(animalId);
  verifyUUID(clinicsDoctorsId);

  const clinicDoctor = await clinicsDoctorsRepository.findOne({
    where: { id: clinicsDoctorsId },
    relations: { doctor: true },
  });
  const animal = await animalsRepository.findOneBy({ id: animalId });

  if (!clinicDoctor) {
    throw new AppError("Doctor not registered in this Clinic", 404);
  }

  if (!animal) {
    throw new AppError("Animal not found", 404);
  }

  const appointmentAlreadyExists = await appointmentsRepository.findOne({
    where: {
      date,
      hour,
      clinicsDoctors: { doctor: { id: clinicDoctor.doctor.id } },
    },
    relations: { clinicsDoctors: { doctor: true } },
  });

  if (appointmentAlreadyExists) {
    throw new AppError("This appointment time is not available");
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
