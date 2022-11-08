import { Reviews } from "../../../entities/reviews.entity";
import { AppError } from "../../../errors/appError";
import { reviewsRepository } from "../../../utilities/repositories";
import verifyUUID from "../../../utilities/verifyUUID";

const updateUserReviewService = async (
  review: string,
  idReview: string,
  userId: string
): Promise<Partial<Reviews>> => {
  verifyUUID(idReview);

  const reviewToBeUpdated = await reviewsRepository.findOne({
    where: { id: idReview },
    relations: { user: true },
  });

  if (!reviewToBeUpdated) {
    throw new AppError("Review not found", 404);
  }

  if (reviewToBeUpdated.user.id != userId) {
    throw new AppError("This is not your review", 403);
  }

  await reviewsRepository.update(idReview, {
    review,
  });

  const reviewFind = await reviewsRepository.findOneBy({ id: idReview });

  return reviewFind!;
};

export default updateUserReviewService;
