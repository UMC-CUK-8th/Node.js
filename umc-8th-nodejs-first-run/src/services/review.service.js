import { DuplicateStoreExist, DuplicateUserExist } from "../errors.js";
import { addReviewRepository } from "../repositories/review.repository.js";

export const addReviewService = async (storeId, userId, reviewData) => {
  // 가게 존재 여부 확인
  const store = await checkStoreExists(storeId);
  if (!store) {
    throw new DuplicateStoreExist("존재하지 않는 가게입니다.", { storeId });
  }

  // 사용자 존재 여부 확인
  const user = await checkUserExists(userId);
  if (!user) {
    throw new DuplicateUserExist("존재하지 않는 사용자입니다.", { userId });
  }

  // 리뷰 작성
  return await addReviewRepository(storeId, userId, reviewData);
};
