import { prisma } from "../db.config.js"; 

export const getAllStoreMissions = async (storeId, cursor = 0) => {
    try {
        const missions = await prisma.mission.findMany({
            select: {
                mission_id: true,
                mission_content: true,
                reward_point: true,
                created_at: true,
                updated_at: true,
                store: {
                    select: {
                        store_id: true,
                        store_name: true,
                    },
                },
                region: {
                    select: {
                        region_id: true,
                        region_name: true,
                    }
                }
            },
            where: {
                store_id: storeId, 
                mission_id: { gt: cursor },
            },
            orderBy: { mission_id: "asc" },
            take: 5,
        });

        console.log(`${storeId}의 미션 목록 조회 완료 (cursor: ${cursor})`);
        return missions;
    } catch (error) {
        console.error("미션 목록 조회 중 오류 발생:", error);
        throw new Error("미션 목록을 가져오는 중 문제가 발생했습니다.");
    }
};
