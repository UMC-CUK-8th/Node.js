import { pool } from "../db.config.js";

export const findStoreByIdRepository = async (storeId) => {
  const [rows] = await pool.query("SELECT * FROM Store WHERE store_id = ?", [storeId]);
  return rows.length > 0 ? rows[0] : null;
};

export const findUserByIdRepository = async (userId) => {
  const [rows] = await pool.query("SELECT * FROM user WHERE user_id = ?", [userId]);
  return rows.length > 0 ? rows[0] : null;
};

export const addReviewRepository = async (storeId, userId, reviewData) => {
  const [result] = await pool.query(
    `INSERT INTO Review (store_id, user_id, rating, review_content, created_at, updated_at)
     VALUES (?, ?, ?, ?, NOW(), NOW())`,
    [storeId, userId, reviewData.rating, reviewData.review_content]
  );

  console.log("✅ 리뷰 저장 완료!", result.insertId);

  return {
    review_id: result.insertId,
    store_id: storeId,
    user_id: userId,
    ...reviewData,
    created_at: new Date(),
    updated_at: new Date(),
  };
};
