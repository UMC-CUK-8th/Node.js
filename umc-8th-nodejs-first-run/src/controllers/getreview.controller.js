import { listStoreReview } from "../services/getreview.service.js"; 
import { responseFromReview } from "../dtos/getreview.dto.js";

export const handleListStoreReviews = async (req, res, next) => {
    try {
        console.log("req.params 값:", req.params); 
        const storeId = parseInt(req.params.store_id); 

        if (isNaN(storeId)) {
            throw new Error(`storeId가 유효한 숫자가 아닙니다. 입력값: ${req.params.store_id}`);
        }

        console.log(`storeId 변환 결과: ${storeId}`);

        const cursor = req.query.cursor ? parseInt(req.query.cursor) : 0;
        const reviews = await listStoreReview(storeId, cursor);

        res.status(200).json({
            message: "리뷰 목록 조회 성공",
            data: reviews.map(responseFromReview),
        });
    } catch (error) {
        console.error("API 요청 오류:", error);
        res.status(500).json({ message: "리뷰 목록 조회 실패", error: error.message });
    }
};



