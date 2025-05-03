import { pool } from "../db.config.js";

export const findReviewByIdRepository = async (reviewId) => {
  const [rows] = await pool.query(
    "SELECT review_id, rating, review_content FROM Review WHERE review_id = ?",
    [reviewId]
  );
  return rows.length > 0 ? rows[0] : null; // ✅ 리뷰 존재 여부 확인
};

export const addReviewImageRepository = async (review, reviewImageData) => {
  const { review_id, rating, review_content } = review;

  console.log("🔹 addReviewImageRepository - review_id:", review_id); // ✅ 이 줄 추가

  const [result] = await pool.query(
    `INSERT INTO Review_image (review_id, image_url, created_at, updated_at) 
     VALUES (?, ?, NOW(), NOW())`,
    [review_id, reviewImageData.image_url]
  );

  console.log("✅ 리뷰 이미지 저장 완료!", result.insertId);

  return {
    review_image_id: result.insertId,
    review_id,
    rating,
    review_content,
    ...reviewImageData,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

