import { pool } from "../db.config.js";

export const saveReview = async ({
  reviewId,
  storeId,
  rating,
  reviewContent,
  reviewImageUrl = null,
}) => {
  await pool.query(
    `INSERT INTO Reviews (review_id, store_id, review_content, rating, review_image_url, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
    [reviewId, storeId, reviewContent, String(rating), reviewImageUrl]
  );
};