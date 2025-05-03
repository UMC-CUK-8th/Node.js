import { pool } from "../db.config.js";

export const addStoreToDB = async (storeData) => {
  try {
    // 🔎 region_id 검증 (NULL 방지 및 타입 변환)
    const regionId = Number(storeData.regionId); // 문자열이 들어올 경우 숫자로 변환
    if (!regionId) {
      throw new Error("regionId가 올바르게 전달되지 않았습니다.");
    }

    console.log("🔹 저장할 regionId:", regionId);

    // 🔎 store_name 검증
    if (!storeData.storeName) {
      throw new Error("storeName이 올바르게 전달되지 않았습니다.");
    }
    
    console.log("🔹 저장할 storeName:", storeData.storeName);

    // 🔎 Region 테이블에서 해당 region_id가 존재하는지 확인
    const [regionExists] = await pool.query(
      `SELECT region_id FROM Region WHERE region_id = ?`,
      [regionId]
    );

    if (regionExists.length === 0) {
      throw new Error(`❌ region_id ${regionId}가 region 테이블에 존재하지 않습니다.`);
    }

    console.log("✅ region_id 존재 확인 완료");

    // 🔎 가게 정보 삽입
    const [result] = await pool.query(
      `INSERT INTO store (region_id, store_name, store_image_url, opening_hours, open_status, location, cuisine, average_rating, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        regionId, // FK 참조
        storeData.storeName,
        storeData.storeImageUrl,
        storeData.openingHours,
        storeData.openStatus,
        storeData.location,
        storeData.cuisine,
        storeData.averageRating,
      ]
    );

    console.log("✅ 가게 정보 저장 완료!");

    // 삽입된 가게 정보 반환
    return {
      storeId: result.insertId,
      regionId,
      storeName: storeData.storeName,
      storeImageUrl: storeData.storeImageUrl,
      openingHours: storeData.openingHours,
      openStatus: storeData.openStatus,
      location: storeData.location,
      cuisine: storeData.cuisine,
      averageRating: storeData.averageRating,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error("❌ DB 저장 중 오류 발생:", error);
    throw new Error(`가게 정보 저장 실패: ${error.message}`);
  }
};
