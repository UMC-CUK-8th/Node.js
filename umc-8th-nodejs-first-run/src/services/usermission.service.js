import { findUserMissionsRepository } from "../repositories/usermission.repository.js";

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
