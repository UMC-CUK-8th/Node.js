import { findStoreByIdRepository, findUserByIdRepository, addReviewRepository } from "../repositories/review.repository.js";

export const addReviewService = async (storeId, userId, reviewData) => {
  // ✅ 가게 존재 여부 확인
  const store = await findStoreByIdRepository(storeId);
  if (!store) {
    throw new Error(`❌ Store ID ${storeId} not found.`);
  }

  // ✅ 사용자 존재 여부 확인
  const user = await findUserByIdRepository(userId);
  if (!user) {
    throw new Error(`❌ User ID ${userId} not found.`);
  }

  // ✅ 리뷰 작성
  return await addReviewRepository(storeId, userId, reviewData);
};
