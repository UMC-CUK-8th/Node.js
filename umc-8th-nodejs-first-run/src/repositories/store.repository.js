import { prisma } from "../db.config.js";

export const addStoreToDB = async (storeData) => {
    // region_id 검증
    const regionId = Number(storeData.regionId);
    if (!regionId) {
      throw new Error("regionId가 올바르게 전달되지 않았습니다.");
    }

    // store_name 검증
    if (!storeData.storeName) {
      throw new Error("storeName이 올바르게 전달되지 않았습니다.");
    }

    // 가게 정보 삽입
    const createdStore = await prisma.store.create({
      data: {
        region_id: regionId,
        store_name: storeData.storeName,
        store_image_url: storeData.storeImageUrl,
        opening_hours: storeData.openingHours,
        open_status: storeData.openStatus,
        location: storeData.location,
        cuisine: storeData.cuisine,
        average_rating: storeData.averageRating,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });

    return createdStore;
};

// 가게 미션 조회
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

// 가게 리뷰 조회
export const getAllStoreReviews = async (storeId, cursor = 0 ) => {

    const reviews = await prisma.review.findMany({
        select: {
            review_id: true,
            review_content: true,
            reply: true,
            created_at: true,
            updated_at: true,
            user: {
                select: {
                    user_id: true,
                    nickname: true,
                },
            },
            store: {
                select: {
                    store_id: true,
                    store_name: true,
                },
            },
        },
        where: {
            store_id: storeId,
            review_id: { gt: cursor },
        },
        orderBy: { review_id: "asc" },
        take: 5,
    });

    return reviews;
};

// 가게 미션 추가
import { DuplicateStoreExist } from "../errors.js";

// 미션 추가 
export const addMissionRepository = async (storeId, missionData) => {
  const store = await prisma.store.findUnique({
    where: { store_id: storeId },
    select: { region_id: true },
  });

  if (!store) {
    throw new DuplicateStoreExist("존재하지 않는 가게입니다.", {storeId});
  }

  // `region_id` 포함하여 미션 데이터 삽입
  const createdMission = await prisma.mission.create({
    data: {
      store_id: storeId,
      region_id: store.region_id,
      mission_content: missionData.mission_content,
      reward_point: missionData.reward_point,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  return createdMission;
};

// 가게 리뷰 추가
export const addReviewRepository = async (storeId, userId, reviewData) => {
  const createdReview = await prisma.review.create({
    data: {
      store_id: storeId,
      user_id: userId,
      rating: reviewData.rating,
      review_content: reviewData.review_content,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });

  console.log("리뷰 저장 완료!", createdReview.review_id);

  return createdReview;
};