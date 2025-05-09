export const createUserMissionDTO = (data, user_id) => {
    if (!data.mission_id || !data.region_id) {
      throw new Error("Missing required fields: mission_id, region_id");
    }
  
    return {
      mission_id: Number(data.mission_id),
      user_id, // URL에서 받은 user_id 적용
      region_id: Number(data.region_id),
      mission_status: "in_progress", // 기본값 설정
      start_at: new Date(), // 현재 시간으로 설정
      completed_at: null, // 아직 완료되지 않음
    };
  };
  