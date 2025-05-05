import { pool } from "../db.config.js";

// 가게 생성
export const createStoreRepo = async (
  regionId,
  storeCategoryId,
  storeName,
  storeAddress,
  operatingHours
) => {
  const [result] = await pool.query(
    `INSERT INTO Stores (region_id, store_category_id, store_name, store_address, operating_hours)
     VALUES (?, ?, ?, ?, ?)`,
    [regionId, storeCategoryId, storeName, storeAddress, operatingHours]
  );
  return result.insertId;
};

// 가게 ID 조회 (존재 여부 확인용)
import { pool } from "../db.config.js";

export const findStoreById = async (storeId) => {
  const [rows] = await pool.query(
    `SELECT store_id FROM Stores WHERE store_id = ?`,
    [storeId]
  );
  return rows[0] || null;
};
