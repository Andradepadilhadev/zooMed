import AppDataSource from "../data-source";
import { Address } from "../entities/address.entity";
import { Animals } from "../entities/animals.entity";
import { Appointments } from "../entities/appointments.entity";
import { Clinics } from "../entities/clinics.entity";
import { ClinicsDoctors } from "../entities/clinicsDoctors.entity";
import { Doctors } from "../entities/doctors.entity";
import { DoctorsSpecialities } from "../entities/doctorsSpecialities.entity";
import { Reviews } from "../entities/reviews.entity";
import { Specialities } from "../entities/specialities.entity";
import { Species } from "../entities/species.entity";
import { Users } from "../entities/users.entity";

export const addressRepository = AppDataSource.getRepository(Address);
export const animalsRepository = AppDataSource.getRepository(Animals);
export const appointmentsRepository = AppDataSource.getRepository(Appointments);
export const clinicsRepository = AppDataSource.getRepository(Clinics);
export const clinicsDoctorsRepository =
  AppDataSource.getRepository(ClinicsDoctors);
export const doctorsRepository = AppDataSource.getRepository(Doctors);
export const doctorsSpecialitiesRepository =
  AppDataSource.getRepository(DoctorsSpecialities);
export const reviewsRepository = AppDataSource.getRepository(Reviews);
export const specialitiesRepository = AppDataSource.getRepository(Specialities);
export const speciesRepository = AppDataSource.getRepository(Species);
export const usersRepository = AppDataSource.getRepository(Users);

export function noPasswordReturn(user: Partial<Users>) {
  const { password, ...rest } = user;
  return rest;
}

export function handleDate(date: string) {
  const handleDate = date.split("/");
  const finalDate = handleDate[0] + "-" + handleDate[1] + "-" + handleDate[3];
  return parseInt(finalDate);
}
