import { findStoreById } from "../repositories/store_repository.js";
import { saveReview } from "../repositories/review_repository.js";

export const addReviewService = async (storeId, reviewData) => {
  const store = await findStoreById(storeId);
  if (!store) {
    throw new Error("StoreNotFound");
  }

  await saveReview({
    reviewId: reviewData.reviewId,
    storeId,
    rating: reviewData.rating,
    reviewContent: reviewData.reviewContent,
    reviewImageUrl: reviewData.reviewImageUrl || null,
  });
};
