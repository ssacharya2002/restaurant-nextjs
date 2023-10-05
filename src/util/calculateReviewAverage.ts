import { Review } from "@prisma/client";

export function calculateReviewAverage(review: Review[]) {
  if (!review) return 0;
  // sum of all reviews / total reviews
  return (
    review.reduce((sum, review) => {
      return sum + review.rating;
    }, 0) / review.length
  );
}
