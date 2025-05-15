import { findUserReviewsRepository } from "../repositories/getuserreview.repository.js";
import { responseFromReview } from "../dtos/getuserreview.dto.js";

export const listUserReviewsService = async (userId, cursor) => {
    try {
        const reviews = await findUserReviewsRepository(userId, cursor);
        return reviews.reviews.map(responseFromReview);
    } catch (error) {
        console.error("리뷰 조회 서비스 오류:", error);
        throw new Error("리뷰 조회 서비스에서 문제가 발생했습니다.");
    }
};
