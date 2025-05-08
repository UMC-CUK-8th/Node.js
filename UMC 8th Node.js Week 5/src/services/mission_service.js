import { findStoreById } from "../repositories/store_repository.js";
import { saveMission } from "../repositories/mission_repository.js";

export const addMissionService = async (storeId, missionData) => {
  const store = await findStoreById(storeId);
  if (!store) {
    throw new Error("StoreNotFound");
  }

  await saveMission({
    missionId: missionData.missionId,
    storeId,
    missionName: missionData.missionName,
    description: missionData.description,
    rewardPoint: missionData.rewardPoint,
    ownerNumber: missionData.ownerNumber,
    dueDate: missionData.dueDate,
  });
};
