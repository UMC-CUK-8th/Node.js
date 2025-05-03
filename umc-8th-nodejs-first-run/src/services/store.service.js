import { responseFromStore } from "../dtos/store.dto.js";
import { addStoreToDB } from "../repositories/store.repository.js";

export const addStore = async (storeData) => {
  const storeId = await addStoreToDB(storeData); // DB 저장
  if (!storeId) {
    throw new Error("가게 정보를 저장할 수 없습니다.");
  }

  return responseFromStore({ ...storeData, storeId });
};
