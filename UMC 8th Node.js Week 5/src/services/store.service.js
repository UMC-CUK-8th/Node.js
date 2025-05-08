import { createStoreRepo } from "../repositories/store.repository.js";

export async function createStoreService(regionId, dto) {
  const storeId = await createStoreRepo(
    regionId,
    dto.store_category_id,
    dto.store_name,
    dto.store_address,
    dto.operating_hours
  );
  return {
    store_id: storeId,
    region_id: regionId,
    ...dto
  };
}
