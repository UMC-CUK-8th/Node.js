import { prisma } from "../db.config.js";

//특정 사용자의 진행 중인 미션 조회
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

//새로운 미션을 `in_progress` 상태로 추가
export const addUserMissionRepository = async (userMissionData) => {
  const createdMission = await prisma.userMission.create({
    data: {
      mission_id: userMissionData.mission_id,
      user_id: userMissionData.user_id,
      region_id: userMissionData.region_id,
      mission_status: userMissionData.mission_status,
      start_at: userMissionData.start_at,
      completed_at: userMissionData.completed_at,
    },
  });

  console.log("새로운 미션 추가 완료", createdMission.user_mission_id);

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
