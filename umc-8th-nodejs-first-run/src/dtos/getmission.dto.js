export const responseFromMission = (mission) => {
    return {
        missionId: mission.mission_id,
        content: mission.mission_content, 
        rewardPoint: mission.reward_point,
        createdAt: mission.created_at,
        updatedAt: mission.updated_at,
        store: mission.store ? { 
            storeId: mission.store.store_id,
            name: mission.store.store_name, 
        } : null,
        region: mission.region ? { 
            regionId: mission.region.region_id,
            regionName: mission.region.region_name,
        } : null,
    };
};
