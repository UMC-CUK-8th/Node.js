import { prisma } from "../db.config.js"; // Prisma ORM 사용

// 가게 조회 (storeId 기반 조회)
export const findStoreByIdRepository = async (storeId) => {
  return await prisma.store.findUnique({
    where: { store_id: storeId }, // `findUnique()`로 데이터 조회
  });
};

// 미션 추가 (store_id → region_id 가져온 후 미션 생성)
export const addMissionRepository = async (storeId, missionData) => {
  // `Store`에서 `region_id` 가져오기
  const store = await prisma.store.findUnique({
    where: { store_id: storeId },
    select: { region_id: true }, // `region_id`만 선택적으로 조회
  });

  if (!store) {
    throw new Error(`Store ID ${storeId} not found.`);
  }

  // `region_id` 포함하여 미션 데이터 삽입
  const createdMission = await prisma.mission.create({
    data: {
      store_id: storeId,
      region_id: store.region_id,
      mission_content: missionData.mission_content,
      reward_point: missionData.reward_point,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  return createdMission;
};
