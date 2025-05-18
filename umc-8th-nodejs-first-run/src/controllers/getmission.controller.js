import { listStoreMission } from "../services/getmission.service.js"; 
import { responseFromMission } from "../dtos/getmission.dto.js";
import { checkStoreExists } from "../services/getmission.service.js";
import { StatusCodes } from "http-status-codes";

export const handleListMissions = async (req, res, next) => {
    try {
        const storeId = parseInt(req.params.store_id); 

        if (isNaN(storeId)) {
            throw new Error("storeId가 유요한 값이 아닙니다.", { store_id });
        }
        
        // 가게가 존재하는지 확인
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
