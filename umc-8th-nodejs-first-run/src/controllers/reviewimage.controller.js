import { StatusCodes } from "http-status-codes";
import { createReviewImageDTO } from "../dtos/reviewimage.dto.js";
import { checkReviewExists } from "../services/reviewimage.service.js";
import { addReviewImage } from "../services/reviewimage.service.js";

export const addReviewImageHandler = async (req, res, next) => { 
  try {
    const reviewId = parseInt(req.params.review_id); 

    if (isNaN(reviewId)) {
      return next(new Error(`reviewID가 유효한 숫자가 아닙니다. 입력값: ${req.params.review_id}`));
    }
    console.log("받은 reviewId:", reviewId);

    await checkReviewExists(reviewId);

    const reviewImageData = createReviewImageDTO(req.body); // DTO 변환
    const newReviewImage = await addReviewImage(reviewId, reviewImageData);

    res.status(StatusCodes.OK).success({ 
      resultType: "SUCCESS",
      message: null,
      success: newReviewImage,
    });

  } catch (error) {
    console.error("API 요청 오류", error);
    return next(error);
  }
};