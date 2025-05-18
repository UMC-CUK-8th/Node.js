import { prisma } from "../db.config.js";
import { responseFromStore } from "../dtos/store.dto.js";
import { 
  DuplicateRegionExist, 
  DuplicateStoreExist,
  DuplicateUserExist,
} from "../errors.js";

import { 
  getAllStoreMissions, 
  getAllStoreReviews, 
  addMissionRepository, 
  addStoreToDB, 
  addReviewRepository 
} from "../repositories/store.repository.js";

// 지역 존재 여부 확인 함수
export const checkRegionExists = async (regionId) => {
  const existingRegion = await prisma.region.findUnique({
    where: { region_id: regionId }
  });

  if (!existingRegion) {
    throw new DuplicateRegionExist("존재하지 않는 지역입니다.", { regionId });
  }

  return existingRegion;
};

// 가게 존재 여부 확인 함수
export const checkStoreExists = async (storeId) => {
  const existingStore = await prisma.store.findUnique({
      where: { store_id: storeId }
  });

  if (!existingStore) {
      throw new DuplicateStoreExist("존재하지 않는 가게입니다.", { storeId });
  }

  return existingStore;
};

// 사용자 존재 여부 확인 함수
export const checkUserExists = async (userId) => {
  const existingUser = await prisma.user.findUnique({
    where: {user_id: userId}
  });

  if (!existingUser) {
    throw new DuplicateUserExist("존재하지 않는 사용자입니다.", {userId});
  }

  return existingUser;
}

// 지역에 가게 추가
export const addStore = async (storeData) => {
  const storeId = await addStoreToDB(storeData); // DB 저장

  return responseFromStore({ ...storeData, storeId });
};

// 가게 미션 조회
export const listStoreMission = async (storeId, cursor, missionData) => {
    return await getAllStoreMissions(storeId, cursor, missionData);
};

// 가게 리뷰 조회
export const listStoreReview = async (storeId, cursor) => {
    return await getAllStoreReviews(storeId, cursor);
};

// 가게 미션 추가
export const addMissionService = async (storeId, missionData) => {
    return await addMissionRepository(storeId, missionData);
};

// 가게 리뷰 추가
export const addReviewService = async (storeId, userId, reviewData) => {
  // 리뷰 작성
  return await addReviewRepository(storeId, userId, reviewData);
};