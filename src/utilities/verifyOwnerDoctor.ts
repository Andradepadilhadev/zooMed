import { clinicsDoctorsRepository } from ".";
import { AppError } from "../errors/appError";
import { IDoctorRequest } from "../interfaces/doctors";

const verifyOwnerDoctor = async ({ clinics_id }: IDoctorRequest) => {
  const doctor = await clinicsDoctorsRepository.findOne({
    where: {
      id: clinics_id,
    },
    relations: {
      clinicId: true,
      //ou doctorId: true
    },
  });

  if (!doctor) {
    throw new AppError("Unauthorized", 401);
  }
};

export { verifyOwnerDoctor };
