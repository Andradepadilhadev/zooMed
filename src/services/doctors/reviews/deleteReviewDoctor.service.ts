import { reviewsRepository } from "../../../utilities/repositories";

const deleteReviewService = async (id: string) => {
  await reviewsRepository.delete({ id });

  return;
};
export default deleteReviewService;
