import { hash } from "bcryptjs";
import { IDoctorUpdate } from "../../interfaces/doctors";
import { doctorsRepository } from "../../utilities/repositories";

const updateDoctorService = async (
  id: string,
  { name, email, password, birthDate }: IDoctorUpdate
) => {
  const doctor = await doctorsRepository.findOneBy({
    id,
  });

  await doctorsRepository.update(id, {
    name: name ? name : doctor!.name,
    email: email ? email : doctor!.email,
    birthDate: birthDate ? birthDate : doctor!.birthDate,
    password: password ? await hash(password!, 10) : doctor!.password,
  });

  const doctorUpdated = await doctorsRepository.findOneBy({
    id,
  });

  return doctorUpdated;
};

export default updateDoctorService;
