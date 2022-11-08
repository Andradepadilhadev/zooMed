import { Reviews } from "../../../entities/reviews.entity";
import { AppError } from "../../../errors/appError";
import {
  appointmentsRepository,
  reviewsRepository,
  usersRepository,
} from "../../../utilities/repositories";

const createUserReviewService = async (
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

  if (appointment.isCanceled) {
    throw new AppError("You can not review a canceled appointment", 403);
  }

  const today = new Date();
  const appointmentDate = new Date(appointment.date);

  if (appointmentDate > today) {
    throw new AppError("Appointment hasn't happened yet", 403);
  }

  const reviewAlreadyExists = await reviewsRepository.findOne({
    where: { appointments: appointment },
  });

  if (reviewAlreadyExists) {
    throw new AppError("You Already reviewed this appointment", 403);
  }
  const newReview = reviewsRepository.create({
    review,
    appointments: appointment,
    user: user!,
  });

  await reviewsRepository.save(newReview);

  return newReview;
};

export default createUserReviewService;
