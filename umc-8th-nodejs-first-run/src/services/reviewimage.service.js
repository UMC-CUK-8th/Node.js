import { prisma } from "../db.config.js";
import { DuplicateReviewExist } from "../errors.js";
import { addReviewImageRepository } from "../repositories/reviewimage.repository.js";

export const addReviewImage = async (reviewId, reviewImageData) => {
    // 리뷰 존재 여부 확인
    await checkReviewExists(reviewId);

    // 이미지 추가
    return await addReviewImageRepository(reviewId, reviewImageData);
};

// 리뷰 존재 여부 확인 함수
export const checkReviewExists = async (reviewId) => {
  const existingReview = await prisma.review.findUnique({
    where: { review_id: reviewId }
  });

  if (!existingReview) {
    throw new DuplicateReviewExist("존재하지 않는 리뷰입니다.", { reviewId });
  }

  return existingReview;
};