import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { addStore, checkRegionExists } from "../services/store.service.js";

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
