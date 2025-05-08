import { addUserMissionRepository, findUserMissionsRepository } from "../repositories/usermission.repository.js";

export const addUserMissionService = async (userMissionData) => {
  return await addUserMissionRepository(userMissionData);
};

export const getUserMissionsService = async (userId) => {
  const userMissions = await findUserMissionsRepository(userId);

  if (!userMissions.length) {
    throw new Error(`❌ No ongoing missions found for user ID ${userId}.`);
  }

  return userMissions;
};
