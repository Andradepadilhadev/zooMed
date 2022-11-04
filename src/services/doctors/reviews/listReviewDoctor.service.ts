import { AppError } from "../../../errors/appError";
import {
  appointmentsRepository,
  clinicsDoctorsRepository,
  reviewsRepository,
} from "../../../utilities/repositories";

const listReviewDoctorService = async (id: string) => {
  const clinicDoctor = await clinicsDoctorsRepository.findOne(
    {
      where: { doctorId: id },
    } || { where: { clinicId: id } }
  );

  if (!clinicDoctor) {
    throw new AppError("Clinic not found", 404);
  }
  const appointmentsForClinic = await appointmentsRepository.find({
    where: {
      clinicsDoctorsId: clinicDoctor,
    },
  });
  const reviewsForClinic = await reviewsRepository.find({
    where: {
      appointments: appointmentsForClinic,
    },
  });

  return reviewsForClinic;
};
export default listReviewDoctorService;
