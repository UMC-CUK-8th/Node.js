import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { addStore } from "../services/store.service.js";

export const handleStoreCreation = async (req, res, next) => {
  const { regionId } = req.params; // URL에서 regionId 가져오기
  console.log("받은 regionId:", regionId); // 값 확인

  const storeData = bodyToStore(req.body, regionId); // DTO 변환

  try {
    const store = await addStore(storeData);
    res.status(StatusCodes.CREATED).json({ result: store });
  } catch (error) {
    console.error("가게 정보 추가 중 오류 발생:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

