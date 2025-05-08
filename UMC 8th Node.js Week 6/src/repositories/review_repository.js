import { prisma } from "../db.config.js";

export const saveReview = async ({
  reviewId,
  storeId,
  rating,
  reviewContent,
  reviewImageUrl = null,
}) => {
  await prisma.reviews.create({
    data: {
      review_id: reviewId,
      store_id: storeId,
      review_content: reviewContent,
      rating: String(rating), // rating이 ENUM이라면 문자열로 넣는 게 안전
      review_image_url: reviewImageUrl,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
};