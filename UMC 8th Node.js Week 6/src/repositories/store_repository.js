import { prisma } from "../db.config.js";

// 가게 생성
export const createStoreRepo = async (
  regionId,
  storeCategoryId,
  storeName,
  storeAddress,
  operatingHours
) => {
  const store = await prisma.stores.create({
    data: {
      region_id: regionId,
      store_category_id: storeCategoryId,
      store_name: storeName,
      store_address: storeAddress,
      operating_hours: operatingHours,
    },
  });
  return store.store_id; // PK 값 반환
};

// 가게 ID 조회 (존재 여부 확인용)
import { prisma } from "../db.config.js";

export const findStoreById = async (storeId) => {
  const store = await prisma.stores.findUnique({
    where: {
      store_id: storeId,
    },
    select: {
      store_id: true,
    },
  });
  return store || null;
};
