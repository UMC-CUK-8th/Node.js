import { prisma } from "../db.config.js"
import { addMissionRepository } from "../repositories/mission.repository.js";
import { DuplicateStoreExist } from "../errors.js";

export const addMissionService = async (storeId, missionData) => {
    return await addMissionRepository(storeId, missionData);
};

// 가게가 존재하는지 확인
export const checkStoreExists = async (store_id) => {
  const existingStore = await prisma.store.findUnique({
      where: { store_id }
  });

  if (!existingStore) {
      throw new DuplicateStoreExist("존재하지 않는 가게입니다.", { store_id });
  }

  return existingStore;
};