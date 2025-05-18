import { prisma } from "../db.config.js";
import { DuplicateUserExist, DuplicateMissionExist } from "../errors.js";
import { addUserMissionRepository, findUserMissionsRepository } from "../repositories/usermission.repository.js";
import { updateUserMissionStatusRepository } from "../repositories/usermission.repository.js";


// 리뷰 조회
export const getUserMissionsService = async (userId, cursor, limit) => {
  const userMissions = await findUserMissionsRepository(userId, cursor, limit);

  // 마지막 커서 반환
  const lastCursor = userMissions.length > 0 ? userMissions[userMissions.length - 1].user_mission_id : null;

  return {
    missions: userMissions,
    nextCursor: lastCursor, // 다음 페이지의 커서 값 반환
  };
};

// 미션 추가
export const addUserMissionService = async (userId, userMissionData) => {
  const newUsermission = await addUserMissionRepository(userId, userMissionData);
  return newUsermission;
};

// 미션 완료 상태 업데이트
export const completeUserMissionService = async (userId, missionId) => {
  const updatedMission = await updateUserMissionStatusRepository(userId, missionId);

  return updatedMission;
};

// 사용자 존재 여부 확인
export const checkUserExists = async (userId) => {
  const existingUser = await prisma.user.findUnique({
    where: {user_id: userId}
  });

  if (!existingUser) {
    throw new DuplicateUserExist("존재하지 않는 사용자입니다.", { userId });
  }

  return existingUser;
}

// 미션 존재 여부 확인
export const checkMissionExists = async (missionId) => {
  const existingMission = await prisma.mission.findUnique({
    where: {mission_id: missionId}
  });

  if (!existingMission) {
    throw new DuplicateMissionExist("존재하지 않는 미션입니다.", { missionId });
  }

  return existingMission;
}