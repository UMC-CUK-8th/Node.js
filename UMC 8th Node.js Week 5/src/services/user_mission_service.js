import { findUserMission, saveUserMission } from "../repositories/user_mission_repository.js";

export const challengeMissionService = async (missionId, userId) => {
  const existing = await findUserMission(userId, missionId);
  if (existing) {
    throw new Error("AlreadyChallenging");
  }

  await saveUserMission({ userId, missionId });
};
