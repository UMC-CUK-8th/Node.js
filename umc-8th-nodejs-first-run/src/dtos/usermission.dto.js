export const createUserMissionDTO = (data, user_id) => {
    if (!data.mission_id || !data.region_id) {
      throw new Error("Missing required fields: mission_id, region_id");
    }
  
    return {
      mission_id: Number(data.mission_id),
      user_id,
      region_id: Number(data.region_id),
      mission_status: "in_progress",
      start_at: new Date(),
      completed_at: null,
    };
  };
  