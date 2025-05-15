import { listStoreMission } from "../services/getmission.service.js"; 
import { responseFromMission } from "../dtos/getmission.dto.js";
import { checkStoreExists } from "../services/getmission.service.js";
import { StatusCodes } from "http-status-codes";

export const handleListMissions = async (req, res, next) => {
    try {
        console.log("req.params 값:", req.params); 
        const storeId = parseInt(req.params.store_id); 

        if (isNaN(storeId)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: `storeId가 유효한 숫자가 아닙니다. 입력값: ${req.params.store_id}`
            });
        }

        console.log(`storeId 변환 결과: ${storeId}`);
        
        const cursor = req.query.cursor ? parseInt(req.query.cursor) : 0;
        const reviews = await listStoreMission(storeId, cursor);

        // 가게가 존재하는지 확인
        try {
            const store = await checkStoreExists(storeId);
            res.status(StatusCodes.OK).success({
                message: "가게 미션 목록 조회 성공",
                data: reviews.map(responseFromMission),
            });
        } catch (error) {
            return next(error);
        }

    } catch (error) {
        console.error("API 요청 오류:", error);

        if (!res.headersSent) { 
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "미션 목록 조회 실패",
                error: error.message,
            });
        }
    }
};
