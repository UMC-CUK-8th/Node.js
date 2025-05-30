// 지역에 가게 추가
export const bodyToStore = (body, regionId) => {
    if (!regionId) {
        throw new Error("regionId가 없습니다!");
      }
    return {
      regionId,
      storeName: body.store_name,
      storeImageUrl: body.store_image_url || "",
      openingHours: body.opening_hours || "00:00-00:00",
      openStatus: body.open_status || "CLOSED",
      location: body.location || "",
      cuisine: body.cuisine || "기타",
      averageRating: body.average_rating || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };
  
  export const responseFromStore = (store) => {
    return {
      storeId: store.store_id,
      regionId: store.region_id,
      storeName: store.store_name,
      storeImageUrl: store.store_image_url,
      openingHours: store.opening_hours,
      openStatus: store.open_status,
      location: store.location,
      cuisine: store.cuisine,
      averageRating: store.average_rating,
      createdAt: store.created_at,
      updatedAt: store.updated_at,
    };
  };
  
  // 가게 미션 조회
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

// 가게 리뷰 조회
export const responseFromReview = (review) => {
  return {
    reviewId: review.review_id,
    content: review.review_content,
    reply: review.reply ?? null,
    createdAt: review.created_at?.toISOString?.() ?? review.created_at,
    updatedAt: review.updated_at?.toISOString?.() ?? review.updated_at,
    user: review.user ? {
      userId: review.user.user_id,
      nickname: review.user.nickname,
    } : null,
    store: review.store ? {
      storeId: review.store.store_id,
      name: review.store.store_name,
    } : null,
  };
};

// 가게 미션 추가
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

// 가게 리뷰 추가
export const createReviewDTO = (data) => {
  const requiredFields = ["rating", "review_content"];
  if (requiredFields.some((field) => !data[field])) {
    throw new Error(`Missing required fields: ${requiredFields.join(", ")}`);
  }

  return {
    rating: data.rating,
    review_content: data.review_content,
  };
};