import { StatusCodes } from "http-status-codes";
import { createMissionDTO } from "../dtos/mission.dto.js";
import { addMissionService } from "../services/mission.service.js";
import { checkStoreExists } from "../services/mission.service.js";

export const createMission = async (req, res, next) => {
  try {
      console.log("req.params 값:", req.params);
      const storeId = parseInt(req.params.store_id);

      if (isNaN(storeId)) {
          return next(new Error(`storeId가 유효한 숫자가 아닙니다. 입력값: ${req.params.store_id}`));
      }

      console.log(`storeId 변환 결과: ${storeId}`);

      const missionData = createMissionDTO(req.body);
      const newMission = await addMissionService(storeId, missionData);

      // 가게 존재 여부 확인
      try {
          const store = await checkStoreExists(storeId);
          res.status(StatusCodes.OK).success({
              message: "가게 미션 목록 추가 성공",
              data: newMission,
          });
      } catch (error) {
          return next(error);
      }

  } catch (error) {
      console.error("API 요청 오류:", error);
      return next(error);
  }
};