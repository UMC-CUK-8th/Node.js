import { prisma } from "../db.config.js";
import { getAllStoreReviews } from "../repositories/getreview.repository.js";
import { DuplicateStoreExist } from "../errors.js";

export const listStoreReview = async (storeId, cursor) => {
    try {
        return await getAllStoreReviews(storeId, cursor);
    } catch (error) {
        console.error("리뷰 조회 서비스 오류:", error);
        throw new Error("리뷰 조회 서비스에서 문제가 발생했습니다.");
    }
};

// 가게가 존재하는지 확인
export const checkStoreExists = async (store_id) => {
    const existingStore = await prisma.store.findMany({
        where: { store_id }
    });

    if (!existingStore.length) {
        throw new DuplicateStoreExist("존재하지 않는 가게입니다.", { store_id });
    }

    return existingStore[0];
};
