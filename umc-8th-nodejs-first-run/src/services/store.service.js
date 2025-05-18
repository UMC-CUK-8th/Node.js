import { prisma } from "../db.config.js";
import { responseFromStore } from "../dtos/store.dto.js";
import { addStoreToDB } from "../repositories/store.repository.js";
import { DuplicateRegionExist } from "../errors.js";

// 지역 존재 여부 확인 함수
export const checkRegionExists = async (regionId) => {
  const existingRegion = await prisma.region.findUnique({
    where: { region_id: regionId }
  });

  if (!existingRegion) {
    throw new DuplicateRegionExist("존재하지 않는 지역입니다.", { regionId });
  }

  return existingRegion;
};

export const addStore = async (storeData) => {
  const storeId = await addStoreToDB(storeData); // DB 저장

  return responseFromStore({ ...storeData, storeId });
};