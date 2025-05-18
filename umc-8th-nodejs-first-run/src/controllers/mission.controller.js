import { StatusCodes } from "http-status-codes";
import { createMissionDTO } from "../dtos/mission.dto.js";
import { addMissionService } from "../services/mission.service.js";
import { checkStoreExists } from "../services/mission.service.js";

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