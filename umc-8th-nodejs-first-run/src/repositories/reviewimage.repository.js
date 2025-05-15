import { prisma } from "../db.config.js";

// 리뷰 조회 (reviewId 기반 조회)
export const findReviewByIdRepository = async (reviewId) => {
  return await prisma.review.findUnique({
    where: { review_id: reviewId },
    select: {
      review_id: true,
      rating: true,
      review_content: true,
    },
  });
};

// 리뷰 이미지 추가
export const addReviewImageRepository = async (review, reviewImageData) => {
  const { review_id, rating, review_content } = review;

  console.log("🔹 addReviewImageRepository - review_id:", review_id);

  const createdReviewImage = await prisma.reviewImage.create({
    data: {
      review_id,
      image_url: reviewImageData.image_url,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  console.log("리뷰 이미지 저장 완료!", createdReviewImage.review_image_id);

  return {
    review_image_id: createdReviewImage.review_image_id,
    review_id,
    rating,
    review_content,
    ...reviewImageData,
    created_at: new Date(),
    updated_at: new Date(),
  };
};
