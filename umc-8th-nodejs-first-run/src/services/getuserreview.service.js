import { prisma } from "../db.config.js";
import { findUserReviewsRepository } from "../repositories/getuserreview.repository.js";
import { responseFromReview } from "../dtos/getuserreview.dto.js";
import { DuplicateUserExist } from "../errors.js";

export const listUserReviewsService = async (userId, cursor) => {
    try {
        const reviews = await findUserReviewsRepository(userId, cursor);
        return reviews.reviews.map(responseFromReview);
    } catch (error) {
        console.error("리뷰 조회 서비스 오류:", error);
        throw new Error("리뷰 조회 서비스에서 문제가 발생했습니다.");
    }
};

// 사용자가 존재하는지 확인하는 함수
export const checkUserExists = async (user_id) => {
    const existingUser = await prisma.user.findMany({
        where: { user_id }
    });

    if (!existingUser.length) {
        throw new DuplicateUserExist ("존재하지 않는 사용자입니다.", { user_id });
    }

    return existingUser[0];
};