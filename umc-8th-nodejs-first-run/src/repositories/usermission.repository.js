import { prisma } from "../prismaClient.js";

export const findUserMissionsRepository = async (userId, cursor, limit) => {
  return await prisma.userMission.findMany({
    where: {
      user_id: userId,
      mission_status: "in_progress",
    },
    take: limit, // 한 번에 가져올 개수 설정
    skip: cursor ? 1 : 0, // 커서 다음 데이터부터 가져오기
    cursor: cursor ? { user_mission_id: cursor } : undefined, // 커서 위치 지정
    orderBy: {
      user_mission_id: "asc", // 오름차순 정렬
    },
    select: {
      user_mission_id: true,
      mission_status: true,
      start_at: true,
      completed_at: true,
      mission: {
        select: {
          mission_content: true,
          reward_point: true,
        },
      },
    },
  });
};
