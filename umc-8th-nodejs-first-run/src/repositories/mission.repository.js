import { prisma } from "../db.config.js";
import { DuplicateStoreExist } from "../errors.js";

// 미션 추가 
export const addMissionRepository = async (storeId, missionData) => {
  const store = await prisma.store.findUnique({
    where: { store_id: storeId },
    select: { region_id: true },
  });

  if (!store) {
    throw new DuplicateStoreExist("존재하지 않는 가게입니다.", {storeId});
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
