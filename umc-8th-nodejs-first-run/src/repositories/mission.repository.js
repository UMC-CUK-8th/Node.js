import { pool } from "../db.config.js";

export const findStoreByIdRepository = async (storeId) => {
  const [rows] = await pool.query("SELECT * FROM Store WHERE store_id = ?", [storeId]);
  return rows.length > 0 ? rows[0] : null; // ✅ 가게 존재 여부 검증
};

export const addMissionRepository = async (storeId, missionData) => {
    // ✅ `Store` 테이블에서 `region_id` 가져오기
    const [store] = await pool.query("SELECT region_id FROM Store WHERE store_id = ?", [storeId]);
    if (!store.length) {
      throw new Error(`❌ Store ID ${storeId} not found.`);
    }
    const regionId = store[0].region_id;
  
    // ✅ `region_id`를 포함하여 `Mission` 데이터 삽입
    const [result] = await pool.query(
      `INSERT INTO Mission (store_id, region_id, mission_content, reward_point, created_at, updated_at) 
       VALUES (?, ?, ?, ?, NOW(), NOW())`,
      [storeId, regionId, missionData.mission_content, missionData.reward_point]
    );
  
    return {
      mission_id: result.insertId,
      store_id: storeId,
      region_id: regionId,
      ...missionData,
      created_at: new Date(),
      updated_at: new Date(),
    };
  };
  
