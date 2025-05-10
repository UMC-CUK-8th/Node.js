import { prisma } from "../db.config.js";

export const addStoreToDB = async (storeData) => {
  try {
    // region_id 검증
    const regionId = Number(storeData.regionId);
    if (!regionId) {
      throw new Error("regionId가 올바르게 전달되지 않았습니다.");
    }

    // store_name 검증
    if (!storeData.storeName) {
      throw new Error("storeName이 올바르게 전달되지 않았습니다.");
    }

    // Region 테이블에서 해당 region_id가 존재하는지 확인
    const regionExists = await prisma.region.findUnique({
      where: { region_id: regionId },
    });

    if (!regionExists) {
      throw new Error(`region_id ${regionId}가 region 테이블에 존재하지 않습니다.`);
    }

    console.log("region_id 존재 확인 완료");

    // 가게 정보 삽입
    const createdStore = await prisma.store.create({
      data: {
        region_id: regionId,
        store_name: storeData.storeName,
        store_image_url: storeData.storeImageUrl,
        opening_hours: storeData.openingHours,
        open_status: storeData.openStatus,
        location: storeData.location,
        cuisine: storeData.cuisine,
        average_rating: storeData.averageRating,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    console.log("가게 정보 저장 완료!");

    // 삽입된 가게 정보 반환
    return createdStore;
  } catch (error) {
    console.error("DB 저장 중 오류 발생:", error);
    throw new Error(`가게 정보 저장 실패: ${error.message}`);
  }
};
