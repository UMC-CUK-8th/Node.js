import { findStoreByIdRepository, addMissionRepository } from "../repositories/mission.repository.js";

export const addMissionService = async (storeId, missionData) => {
  // ✅ 가게 존재 여부 확인
  const store = await findStoreByIdRepository(storeId);
  if (!store) {
    throw new Error(`❌ Store ID ${storeId} not found.`);
  }

  // ✅ 미션 추가
  return await addMissionRepository(storeId, missionData);
};
