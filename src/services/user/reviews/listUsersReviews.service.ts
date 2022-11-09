import {
  reviewsRepository,
  usersRepository,
} from "../../../utilities/repositories";

const listUsersReviewsService = async (userId: string) => {
  const usersReviews = await reviewsRepository.find({
    where: { user: { id: userId } },
    relations: { user: true },
  });

  return usersReviews;
};

export default listUsersReviewsService;
