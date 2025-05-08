import { pool } from "../db.config.js";

export async function createStoreRepo(regionId, storeCategoryId, storeName, storeAddress, operatingHours) {
  const sql = `
    INSERT INTO Stores (store_category_id, region_id, store_name, store_address, operating_hours)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await pool.execute(sql, [
    storeCategoryId,
    regionId,
    storeName,
    storeAddress,
    operatingHours
  ]);
  return result.insertId;
}
