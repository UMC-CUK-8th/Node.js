import { getAllStoreReviews } from "../repositories/getreview.repository.js";

export const listStoreReview = async (storeId, cursor) => {
    try {
        return await getAllStoreReviews(storeId, cursor);
    } catch (error) {
        console.error("리뷰 조회 서비스 오류:", error);
        throw new Error("리뷰 조회 서비스에서 문제가 발생했습니다.");
    }
};
