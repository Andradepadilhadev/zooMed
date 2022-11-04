import { hash } from "bcryptjs";
import { AppError } from "../../errors/appError";
import { IDoctorUpdate } from "../../interfaces/doctors";
import { doctorsRepository } from "../../utilities/repositories";

const updateDoctorService = async ({
  name,
  email,
  password,
  birthDate,
}: IDoctorUpdate) => {
  const doctor = await doctorsRepository.findOneBy({
    email,
  });

  if (!doctor) {
    throw new AppError("Doctor not found", 400);
  }

  const doctorUpdated = await doctorsRepository.update(email, {
    name: name ? name : doctor.name,
    email: email ? email : doctor.email,
    birthDate: birthDate ? birthDate : doctor.birthDate,
    password: password ? await hash(password!, 10) : doctor.password,
  });

  return doctorUpdated;
};

export default updateDoctorService;
