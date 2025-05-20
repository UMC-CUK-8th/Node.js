export const createMissionDTO = (data) => {
    if (!data.mission_content || !data.reward_point) {
      throw new Error("mission_content 혹은 reward_point가 존재하지 않습니다.");
    }
  
    if (isNaN(data.reward_point)) {
      throw new Error("Reward point는 숫자여야합니다.");
    }
  
    return {
      mission_content: data.mission_content,
      reward_point: Number(data.reward_point),
    };
  };
  