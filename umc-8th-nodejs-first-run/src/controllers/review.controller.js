import { StatusCodes } from "http-status-codes";
import { createReviewDTO } from "../dtos/review.dto.js";
import { addReviewService } from "../services/review.service.js";
import { checkStoreExists } from "../services/mission.service.js";
import { checkUserExists } from "../services/getuserreview.service.js";

export const addReview = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.store_id); 
    const userId = parseInt(req.params.user_id); 

    if (isNaN(storeId)) {
      return next(new Error(`storeId가 유효한 숫자가 아닙니다. 입력값: ${req.params.store_id}`));
    }
    if (isNaN(userId)) {
      return next(new Error(`userId가 유효한 숫자가 아닙니다. 입력값: ${req.params.user_id}`));
    }

    const reviewData = createReviewDTO(req.body); // DTO 변환 및 검증

    // 가게 존재 여부 확인
    await checkStoreExists(storeId);

    // 사용자 존재 여부 확인
    await checkUserExists(userId);

    // 리뷰 추가
    const newReview = await addReviewService(storeId, userId, reviewData);

    // 성공 응답 반환
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