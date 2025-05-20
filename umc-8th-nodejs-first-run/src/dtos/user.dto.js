// 회원가입
export const bodyToUser = (body) => {
    return {
      email: body.email,
      name: body.name,
      nickname: body.nickname,
      gender: body.gender,
      birth: new Date(body.birth),
      address: body.address || "",
      phone_number: body.phone_number, 
      is_agreed: body.is_agreed,
      sns_provider: body.sns_provider,
      sns_id: body.sns_id,
      status: body.status,
      profile_image_url: body.profile_image_url || "",
      is_phone_verified: body.is_phone_verified,
      user_point: body.user_point,
      preferences: body.preference || [], 
    };
  };
  
  export const responseFromUser = ({ user, preferences }) => {
    const preferFoods = preferences.map(
      (preference) => preference.preference.name
    );

    return {
      email: user.email,
      name: user.name,
      preferCategoty: preferFoods,
    };
  };
  
// 사용자 리뷰 조회
export const responseFromReview = (review) => {
  return {
      reviewId: review.review_id,
      reviewContent: review.review_content,
      reply: review.reply ?? null, 
      rating: review.rating,
      createdAt: review.created_at,
      updatedAt: review.updated_at,
      userNickname: review.user.nickname,
      images: review.reviewimages.map(image => ({
          reviewImageId: image.reviewimage_id,
          imageUrl: image.image_url,
      })),
      store: {
          storeId: review.store.store_id,
          name: review.store.store_name,
      },
  };
};

// 사용자 미션 추가
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
