import { prisma } from "../db.config.js";

export const findUserMission = async (userId, missionId) => {
  const userMission = await prisma.user_Mission.findUnique({
    where: {
      user_id_mission_id: {
        user_id: userId,
        mission_id: missionId,
      },
    },
  });
  return userMission || null;
};

export const saveUserMission = async ({ userId, missionId }) => {
  await prisma.user_Mission.create({
    data: {
      user_id: userId,
      mission_id: missionId,
      status: "in_progress", // ENUM or String
      challenged_at: new Date(), // Prisma는 NOW() 대신 JS Date 객체 사용
    },
  });
};
