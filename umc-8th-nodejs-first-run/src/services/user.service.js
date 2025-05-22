import { responseFromUser } from "../dtos/user.dto.js";
import { responseFromReview } from "../dtos/user.dto.js";
import { prisma } from "../db.config.js";
import {
  addUser,
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
  DuplicateUserNickname,
} from "../errors.js";

// 사용자 존재 여부 확인
export const checkUserExists = async (user_id) => {
  const existingUser = await prisma.user.findUnique({
    where: { user_id }
  });

  if (!existingUser) {
    throw new DuplicateUserExist("존재하지 않는 사용자입니다.", { user_id });
  }

  return existingUser;
};

// 이메일 중복 확인
export const checkUserEmailExists = async => {
  const existingUserEmail = prisma.user.findUnique({
    where: { email }
  });

  if (!existingUserEmail) {
    throw new DuplicateUserEmailError("중복된 이메일입니다.", { email });
  }

  return existingUserEmail;
}

// 닉네임 중복 확인
export const checkUserNicknameExists = async => {
  const existingUserNickname = prisma.user.findUnique({
    where: { nickname }
  });

  if (!existingUserNickname) {
    throw new DuplicateUserNickname("중복된 닉네임입니다.", { nickname });
  }

  return existingUserNickname;
}

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
  const preferences = data.preference || [];
  const userData = { ...data };
  delete userData.preference;

  const userId = await addUser(userData);

  if (!userId) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  await checkUserNicknameExists;
  
  // 선호도 등록
  for (const preferenceId of preferences) {
    await setPreference(userId, preferenceId);
  }

  const user = await prisma.user.findUnique({
    where: { user_id: userId },
    include: {
      userPreferences: {
        include: { preference: true },
      },
    },
  });

  const preferList = await getUserPreferencesByUserId(userId);
  return responseFromUser({ user, preferences: preferList });
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
