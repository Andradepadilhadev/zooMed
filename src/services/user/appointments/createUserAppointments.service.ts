import { Appointments } from "../../../entities/appointments.entity";
import { IAppointments } from "../../../interfaces/users";
import {
  animalsRepository,
  appointmentsRepository,
  doctorsRepository,
  usersRepository,
} from "../../../utilities";

const createAppointments = async ({
  date,
  hour,
  animalsId,
  doctorId,
}: IAppointments): Promise<Partial<Appointments>> => {
  const doctor = await doctorsRepository.findOneBy({ id: doctorId });
  const animal = await animalsRepository.findOneBy({ id: animalsId });

  if (!doctor || !animal) {
    //     throw new AppError(400, "Not found, doctor or animal");
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

export default createAppointments;
