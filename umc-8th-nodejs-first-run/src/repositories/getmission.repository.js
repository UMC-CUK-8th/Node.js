import { prisma } from "../db.config.js"; 

export const getAllStoreMissions = async (storeId, cursor = 0, missionData = {}) => {
    // null 제거
    const cleanData = Object.fromEntries(
        Object.entries(missionData).filter(([_, v]) => v !== null)
    );

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
            ...cleanData
        },
        orderBy: { mission_id: "asc" },
        take: 5,
    });

    return missions;
};