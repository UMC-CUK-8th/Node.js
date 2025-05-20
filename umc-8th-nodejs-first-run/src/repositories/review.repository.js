import { prisma } from "../db.config.js"; 

// 리뷰 추가
export const addReviewRepository = async (storeId, userId, reviewData) => {
  const createdReview = await prisma.review.create({
    data: {
      store_id: storeId,
      user_id: userId,
      rating: reviewData.rating,
      review_content: reviewData.review_content,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  console.log("리뷰 저장 완료!", createdReview.review_id);

  return createdReview;
};
