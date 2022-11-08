import { verifyDateFormat } from "./../../utilities/verifyDateFormat";
import { hash } from "bcryptjs";
import { Doctors } from "../../entities/doctors.entity";
import { AppError } from "../../errors/appError";
import { IDoctorRequest } from "../../interfaces/doctors";
import {
  doctorsRepository,
  usersRepository,
} from "../../utilities/repositories";
import { validatePassword } from "../../validators";

const createDoctorService = async ({
  name,
  email,
  password,
  birthDate,
  crmv,
}: IDoctorRequest): Promise<Doctors> => {
  if (!password) {
    throw new AppError("Password is missing", 400);
  }

  if (!crmv) {
    throw new AppError("Crmv is missing", 400);
  }

  if (crmv.length > 6) {
    throw new AppError("Crmv incorrect", 400);
  }

  await validatePassword(password);

  verifyDateFormat(birthDate);

  const doctorAlreadyExists = await doctorsRepository.findOneBy({ email });
  const emailAlreadyExistsInUsers = await usersRepository.findOneBy({ email });

  if (doctorAlreadyExists || emailAlreadyExistsInUsers) {
    throw new AppError("Email already exists", 409);
  }

  const hashedPassword = await hash(password, 10);

  const newDoctor = doctorsRepository.create({
    name,
    email,
    password: hashedPassword,
    birthDate,
    crmv,
  });

  await doctorsRepository.save(newDoctor);

  return newDoctor;
};

export default createDoctorService;
