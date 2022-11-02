import { DatabaseError } from "pg";
import { Appointments } from "../../../entities/appointments.entity";
import { Reviews } from "../../../entities/reviews.entity";
import { AppError } from "../../../errors/appError";
import {
  appointmentsRepository,
  reviewsRepository,
  usersRepository,
} from "../../../utilities";

const cr../../../utilities/repositoriesice = async (
  review: string,
  appointmentsId: string,
  userId: string
): Promise<Partial<Reviews>> => {
  const user = await usersRepository.findOneBy({ id: userId });
  const appointment = await appointmentsRepository.findOneBy({
    id: appointmentsId,
  });
  if (!appointment) {
    throw new AppError("Appointment not found", 400);
  }

  const hoje = new Date();
  const appointmentDate = new Date(appointment.date);

  if (appointmentDate > hoje) {
    throw new AppError("Appointment not happen", 400);
  }
  const newReview = {
    review,
    appointment: appointment,
  };

  reviewsRepository.save(newReview);
  return newReview;
};

export default createUserReviewService;
