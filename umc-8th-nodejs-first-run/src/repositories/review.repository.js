import { prisma } from "../db.config.js"; 

// 가게 조회 (storeId 기반 조회)
export const findStoreByIdRepository = async (storeId) => {
  return await prisma.store.findUnique({
    where: { store_id: storeId },
  });
};

// 사용자 조회 (userId 기반 조회)
export const findUserByIdRepository = async (userId) => {
  return await prisma.user.findUnique({
    where: { user_id: userId }, 
  });
};

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
