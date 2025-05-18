import { responseFromUser } from "../dtos/user.dto.js";
import { responseFromReview } from "../dtos/user.dto.js";
import { prisma } from "../db.config.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  findUserReviewsRepository, 
  findUserMissionsRepository,
  addUserMissionRepository,
  updateUserMissionStatusRepository,
} from "../repositories/user.repository.js";

import {
  DuplicateUserEmailError,
  DuplicateUserExist,
  DuplicateMissionExist,
} from "../errors.js";

// 사용자 존재 여부 확인
export const checkUserExists = async (user_id) => {
  const existingUser = await prisma.user.findMany({
    where: { user_id }
  });

  if (!existingUser.length) {
    throw new DuplicateUserExist("존재하지 않는 사용자입니다.", { user_id });
  }

  return existingUser[0];
};

// 미션 존재 여부 확인
export const checkMissionExists = async (missionId) => {
  const existingMission = await prisma.mission.findUnique({
    where: { mission_id: missionId }
  });

  if (!existingMission) {
    throw new DuplicateMissionExist("존재하지 않는 미션입니다.", { missionId });
  }

  return existingMission;
};

// 회원가입
export const userSignUp = async (data) => {
  // 1. 사용자 추가 (중복이면 null 반환)
  const userId = await addUser(data);

  if (!userId) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  // 2. 사용자 선호도 저장 (1개씩 반복)
  if (data.preferences && data.preferences.length > 0) {
    for (const preferenceId of data.preferences) {
      await setPreference(userId, preferenceId);
    }
  }

  // 3. 사용자 정보 조회
  const user = await getUser(userId);

  // 4. 사용자 선호도 조회
  const preferences = await getUserPreferencesByUserId(userId);

  // 5. 응답 DTO 가공 후 반환
  return responseFromUser({ user, preferences });
};

// 사용자 리뷰 조회
export const listUserReviewsService = async (userId, cursor) => {
  const { reviews, nextCursor } = await findUserReviewsRepository(userId, cursor);
  const formattedReviews = reviews.map(responseFromReview);
  return { reviews: formattedReviews, nextCursor };
};

// 사용자 미션 조회
export const getUserMissionsService = async (userId) => {
  const userMissions = await findUserMissionsRepository(userId);

  const lastCursor = userMissions.length > 0
    ? userMissions[userMissions.length - 1].user_mission_id
    : null;

  return {
    missions: userMissions,
    nextCursor: lastCursor,
  };
};

// 새로운 미션을 `in_progress` 상태로 추가
export const addUserMissionService = async (userId, userMissionData) => {
  return await addUserMissionRepository(userId, userMissionData);
};

// 미션 상태 업데이트
export const completeUserMissionService = async (userId, missionId) => {
  return await updateUserMissionStatusRepository(userId, missionId);
};
