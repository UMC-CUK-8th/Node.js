import { findUserMissionsRepository } from "../repositories/usermission.repository.js";
import { updateUserMissionStatusRepository } from "../repositories/usermission.repository.js";

export const getUserMissionsService = async (userId, cursor, limit) => {
  const userMissions = await findUserMissionsRepository(userId, cursor, limit);

  if (!userMissions.length) {
    throw new Error(`No ongoing missions found for user ID ${userId}.`);
  }

  // 마지막 커서 반환
  const lastCursor = userMissions.length > 0 ? userMissions[userMissions.length - 1].user_mission_id : null;

  return {
    missions: userMissions,
    nextCursor: lastCursor, // 다음 페이지의 커서 값 반환
  };
};

// 미션 완료 상태 업데이트
export const completeUserMissionService = async (userId, missionId) => {
  const updatedMission = await updateUserMissionStatusRepository(userId, missionId);

  if (!updatedMission) {
    throw new Error(`Mission ${missionId} for User ${userId} not found or not in progress.`);
  }

  return updatedMission;
};
