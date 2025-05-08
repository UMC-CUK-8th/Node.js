export const createMissionDTO = (data) => {
    if (!data.mission_content || !data.reward_point) {
      throw new Error("❌ Missing required fields: mission_content or reward_point");
    }
  
    if (isNaN(data.reward_point)) {
      throw new Error("❌ Reward point must be a number");
    }
  
    return {
      mission_content: data.mission_content,
      reward_point: Number(data.reward_point), // ✅ 숫자로 변환
    };
  };
  