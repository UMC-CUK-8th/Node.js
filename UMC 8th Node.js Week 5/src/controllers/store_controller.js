import { StatusCodes } from "http-status-codes";
import { createStoreService } from "../services/store_service.js";
import { validateStoreDto, bodyToStore } from "../dtos/store_dto.js";

export const createStore = async (req, res) => {
  const regionId = parseInt(req.params.regionId, 10);
  const body = req.body;

  if (!validateStoreDto(body)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "필수값 누락" });
  }

  if (isNaN(regionId)) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: "잘못된 regionId" });
  }

  try {
    const store = await createStoreService(regionId, bodyToStore(body));
    res.status(StatusCodes.CREATED).json({ result: store });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "DB 오류", error: error.message });
  }
};
