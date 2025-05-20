import { listStoreReview } from "../services/getreview.service.js"; 
import { responseFromReview } from "../dtos/getreview.dto.js";
import { checkStoreExists } from "../services/getreview.service.js";
import { StatusCodes } from "http-status-codes";

export const handleListStoreReviews = async (req, res, next) => {
    try {
      const storeId = parseInt(req.params.store_id);
  
      if (isNaN(storeId)) {
        throw new Error(`storeId가 유효한 숫자가 아닙니다. ${req.params.store_id}`);
      }
  
      await checkStoreExists(storeId);
  
      const cursor = req.query.cursor ? parseInt(req.query.cursor) : 0;
  
      // 리뷰 조회
      const reviews = await listStoreReview(storeId, cursor);
  
      // DTO 변환
      const formattedReviews = reviews.map(responseFromReview);
  
      res.status(StatusCodes.OK).success({
        resultType: "SUCCESS",
        message: null,
        data: formattedReviews,
      });
  
    } catch (error) {
      return next(error);
    }
  };  