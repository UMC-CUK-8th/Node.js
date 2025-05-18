import { prisma } from "../db.config.js";

// 리뷰 이미지 추가
export const addReviewImageRepository = async (reviewId, reviewImageData) => {
  const createdReviewImage = await prisma.reviewImage.create({
    data: {
      review_id: reviewId,
      image_url: reviewImageData.image_url,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  return {
    review_image_id: createdReviewImage.review_image_id,
    review_id: reviewId,
    ...reviewImageData,
    created_at: new Date(),
    updated_at: new Date(),
  };
};