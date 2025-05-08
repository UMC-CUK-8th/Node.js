import { prisma } from "../db.config.js";

export const saveMission = async ({
  missionId,
  storeId,
  missionName,
  description,
  rewardPoint,
  ownerNumber,
  dueDate,
}) => {
  await prisma.missions.create({
    data: {
      mission_id: missionId,
      store_id: storeId,
      mission_name: missionName,
      description,
      reward_point: rewardPoint,
      owner_number: ownerNumber,
      due_date: dueDate,
    },
  });
};