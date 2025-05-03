import { findReviewByIdRepository, addReviewImageRepository } from "../repositories/reviewimage.repository.js";

export const addReviewImageService = async (reviewId, reviewImageData) => {
  const review = await findReviewByIdRepository(reviewId);
  if (!review) {
    console.error("❌ 해당 review를 찾을 수 없습니다. reviewId:", reviewId); // ✅ 추가
    throw new Error(`❌ Review ID ${reviewId} not found.`);
  }

  console.log("🔹 가져온 review 데이터:", review); // 확인용
  console.log("🔹 review_id to insert:", review.review_id); // ✅ 이 줄 추가해서 확인

  return await addReviewImageRepository(review, reviewImageData);
};

