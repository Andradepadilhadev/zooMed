import { hash } from "bcryptjs";
import { Doctors } from "../../entities/doctors.entity";
import { AppError } from "../../errors/appError";
import { IDoctorRequest } from "../../interfaces/doctors";
import { doctorsRepository } from "../../utilities/repositories";

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

  const doctorAlreadyExists = await doctorsRepository.findOneBy({ email });

  if (doctorAlreadyExists) {
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
