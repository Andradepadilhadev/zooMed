import { AppError } from "../../../errors/appError";
import {
  appointmentsRepository,
  clinicsDoctorsRepository,
  reviewsRepository,
} from "../../../utilities/repositories";

const listReviewDoctorService = async (id: string) => {
  const clinicDoctor = await clinicsDoctorsRepository.find({
    where: { doctor: { id } },
  });

  if (!clinicDoctor) {
    throw new AppError("You don't have any reviews", 400);
  }

  const doctorsAppointments = await appointmentsRepository.find({
    where: {
      clinicsDoctors: clinicDoctor,
    },
  });

  const doctorsReviews = await reviewsRepository.find({
    where: {
      appointments: doctorsAppointments,
    },
  });

  return doctorsReviews;
};
export default listReviewDoctorService;
