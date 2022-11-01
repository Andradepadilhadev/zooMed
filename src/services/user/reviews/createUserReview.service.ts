import { Appointments } from "../../../entities/appointments.entity";
import { Reviews } from "../../../entities/reviews.entity";
import {
  appointmentsRepository,
  reviewsRepository,
  usersRepository,
} from "../../../utilities";

const createUserReviewService = async (
  review: string,
  appointmentsId: string,
  userId: string
): Promise<Partial<Reviews>> => {
  const user = await usersRepository.findOneBy({ id: userId });
  const appointment = await appointmentsRepository.findOneBy({
    id: appointmentsId,
  });

  const newReview = {
    review,
    appointment: appointment,
  };

  reviewsRepository.save(newReview);
  return newReview;
};

export default createUserReviewService;
