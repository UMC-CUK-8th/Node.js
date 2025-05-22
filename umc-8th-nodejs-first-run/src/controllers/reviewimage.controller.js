import { StatusCodes } from "http-status-codes";
import { createReviewImageDTO } from "../dtos/reviewimage.dto.js";
import { checkReviewExists } from "../services/reviewimage.service.js";
import { addReviewImage } from "../services/reviewimage.service.js";

// 리뷰에 이미지 추가
export const addReviewImageHandler = async (req, res, next) => { 
  /* 
   #swagger.summary = '리뷰에 이미지 추가 API';
   #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            image_url: {type: "string", format: "uri"},
            created_at: {type: "string", format: "date"},
            updated_at: {type: "string", format: "date"} }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "리뷰에 이미지 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: {type: "string", example: "SUCCESS"},
              error: {type: "object", nullable: true, example: null},
              success: {
                type: "object",
                properties: {
                  review_id: {type: "integer"},
                  image_url: {type: "string", format: "uri"},
                  created_at: {type: "string", format: "date"},
                  updated_at: {type: "string", format: "date"} }
                }
              }
            }
          }
        }
      }
      #swagger.responses[400] = {
      description: "리뷰에 이미지 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: {type: "string", example: "FAIL"},
              error: {
                type: "object",
                properties: {
                  errorCode: {type: "string", example: "R001"},
                  reason: {type: "string"},
                  data: {type: "object"}
                }
              },
              success: {type: "object", nullable: true, example: null}
            }
          }
        }
      }
    }
  */
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