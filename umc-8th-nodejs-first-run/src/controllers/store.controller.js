import { StatusCodes } from "http-status-codes";
import { 
  bodyToStore,
  responseFromMission,
  responseFromReview,
  createMissionDTO,
  createReviewDTO,
 } from "../dtos/store.dto.js";

import { 
  addStore, 
  checkRegionExists,
  listStoreMission,
  checkStoreExists,
  listStoreReview,
  addMissionService,
  addReviewService,
  checkUserExists
 } from "../services/store.service.js";

// 지역에 가게 추가
export const handleStoreCreation = async (req, res, next) => {
  try {
    const regionId = parseInt(req.params.region_id);

    if (isNaN(regionId)) {
      return next(new Error(`regionId가 유효한 숫자가 아닙니다. 입력값: ${req.params.region_id}`));
    }
    console.log("받은 regionId:", regionId);

    await checkRegionExists(regionId);

    const storeData = bodyToStore(req.body, regionId); // DTO 변환
    const newStore = await addStore(storeData);

    res.status(StatusCodes.OK).success({
      resultType: "SUCCESS",
      message: "가게 등록 성공",
      data: newStore,
    });

  } catch (error) {
    console.error("API 요청 오류:", error);
    return next(error);
  }
};

// 가게 미션 조회
export const handleListMissions = async (req, res, next) => {
    try {
        const storeId = parseInt(req.params.store_id); 

        if (isNaN(storeId)) {
            throw new Error("storeId가 유효한 값이 아닙니다.", { store_id });
        }
        
        await checkStoreExists(storeId);

        const cursor = req.query.cursor ? parseInt(req.query.cursor) : 0;
        const missionData = responseFromMission(req.body); // DTO 변환
        const missions = await listStoreMission(storeId, cursor, missionData);


        res.status(StatusCodes.OK).success ({
            resultType : "SUCCESS",
            message: null,
            data: missions,
        });

    } catch (error) {
        return next(error);
    }
};

// 가게에 미션 추가
export const createMission = async (req, res, next) => {
  try {
      const storeId = parseInt(req.params.store_id);

      if (isNaN(storeId)) {
          return next(new Error(`storeId가 유효한 숫자가 아닙니다. ${req.params.store_id}`));
      }

      await checkStoreExists(storeId);

      const missionData = createMissionDTO(req.body); // DTO 변환
      const newMission = await addMissionService(storeId, missionData);

     res.status(StatusCodes.OK).success ({
        resultType: "SUCCESS",
        message: null,
        data: newMission,
     });
  } catch (error) {
      return next(error);
  }
};

// 가게 리뷰 조회
export const handleListStoreReviews = async (req, res, next) => {
    try {
      const storeId = parseInt(req.params.store_id);
  
      if (isNaN(storeId)) {
        throw new Error(`storeId가 유효한 숫자가 아닙니다. ${req.params.store_id}`);
      }
  
      await checkStoreExists(storeId);
  
      const cursor = req.query.cursor ? parseInt(req.query.cursor) : 0;
      const reviews = await listStoreReview(storeId, cursor);
      const formattedReviews = reviews.map(responseFromReview); // DTO 변환
  
      res.status(StatusCodes.OK).success({
        resultType: "SUCCESS",
        message: null,
        data: formattedReviews,
      });
  
    } catch (error) {
      return next(error);
    }
  };  
  
  // 가게에 리뷰 추가
  export const addReview = async (req, res, next) => {
    try {
      const storeId = parseInt(req.params.store_id); 
      const userId = parseInt(req.params.user_id); 
  
      if (isNaN(storeId)) {
        return next(new Error(`storeId가 유효한 숫자가 아닙니다. ${req.params.store_id}`));
      }
      if (isNaN(userId)) {
        return next(new Error(`userId가 유효한 숫자가 아닙니다. ${req.params.user_id}`));
      }
  
      const reviewData = createReviewDTO(req.body); // DTO 변환
  
      await checkStoreExists(storeId);
      await checkUserExists(userId);
  

      const newReview = await addReviewService(storeId, userId, reviewData);
  
      res.status(StatusCodes.OK).success({
        resultType: "SUCCESS",
        message: null,
        success: newReview
      });
  
    } catch (error) {
      console.error("API 요청 오류", error);
      return next(error);
    }
  };

