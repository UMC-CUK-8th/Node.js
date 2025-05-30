import { prisma } from "../db.config.js";

// 회원가입

// 사용자 추가
export const addUser = async (data) => {
  const createdUser = await prisma.user.create({ data });
  return createdUser.user_id;
};

// 사용자 선호 설정
export const setPreference = async (userId, preferenceId) => {
  await prisma.user_Preference.create({
    data: {
      user: { connect: { user_id: userId } },
      preference: { connect: { preference_id: preferenceId } },
    },
  });
};

// 특정 사용자 선호도 조회
export const getUserPreferencesByUserId = async (userId) => {
  return await prisma.user_Preference.findMany({
    select: {
      id: true,
      userId: true,
      preferenceId: true,
      preference: true,
    },
    where: { userId },
    orderBy: { preferenceId: "asc" },
  });
};

// 사용자 리뷰 조회
export const findUserReviewsRepository = async (userId, cursor = 0) => {
    try {
        const reviews = await prisma.review.findMany({
            where: {
                user_id: userId,
                review_id: { gt: cursor },
            },
            select: {
                review_id: true,
                review_content: true,
                reply: true,
                rating: true,
                created_at: true,
                updated_at: true,
                reviewimages: {
                    select: {
                        reviewimage_id: true,
                        image_url: true,
                    },
                },
                store: {
                    select: {
                        store_id: true,
                        store_name: true,
                    },
                },
                user: { 
                    select: {
                        nickname: true,
                    },
                },
            },
            orderBy: { review_id: "asc" },
            take: 5,
        });

        // 다음 커서 값 설정 (마지막 리뷰 ID)
        const nextCursor = reviews.length > 0 ? reviews[reviews.length - 1].review_id : null;

        return { reviews, nextCursor };
    } catch (error) {
        return next(error);
    }
};

// 사용자 미션 조회
export const findUserMissionsRepository = async (userId) => {
  return await prisma.userMission.findMany({
    where: {
      user_id: userId,
      mission_status: "in_progress",
    },
    select: {
      user_mission_id: true,
      mission: {
        select: {
          mission_content: true,
          reward_point: true,
        },
      },
      mission_status: true,
      start_at: true,
      completed_at: true,
    },
  });
};

// 새로운 미션을 `in_progress` 상태로 추가
export const addUserMissionRepository = async (userId, userMissionData) => {

  const createdMission = await prisma.userMission.create({
    data: {
      mission_id: userMissionData.mission_id,
      user_id: userId,
      region_id: userMissionData.region_id,
      mission_status: userMissionData.mission_status || "in_progress",
      start_at: userMissionData.start_at || new Date(),
      completed_at: null,
    },
  });

  return createdMission;
};

// 미션 완료 상태 업데이트
export const updateUserMissionStatusRepository = async (userId, missionId) => {
  return await prisma.userMission.updateMany({
    where: {
      user_id: userId,
      mission_id: missionId,
      mission_status: "in_progress",
    },
    data: {
      mission_status: "completed",
      completed_at: new Date(), 
    },
  });
};

// 연동 로그인 시 사용자 정보 추가
export const updateUserById = async (userId, data) => {
  return await prisma.user.update({
    where: { user_id: userId },
    data,
  });
};