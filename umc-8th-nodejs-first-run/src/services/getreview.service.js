import { prisma } from "../db.config.js";
import { getAllStoreReviews } from "../repositories/getreview.repository.js";
import { DuplicateStoreExist } from "../errors.js";

export const listStoreReview = async (storeId, cursor) => {
    return await getAllStoreReviews(storeId, cursor);
};

// 가게가 존재하는지 확인
export const checkStoreExists = async (storeId) => {
    const existingStore = await prisma.store.findUnique({
        where: { store_id: storeId }
    });

    if (!existingStore) {
        throw new DuplicateStoreExist("존재하지 않는 가게입니다.", { storeId });
    }

    return existingStore;
};
