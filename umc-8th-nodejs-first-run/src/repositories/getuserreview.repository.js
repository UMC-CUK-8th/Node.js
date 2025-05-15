import { prisma } from "../db.config.js";

export const findUserReviewsRepository = async (userId, cursor = 0) => {
    try {
        const reviews = await prisma.review.findMany({
            where: {
                user_id: userId,
                review_id: { gt: cursor },
            },
            select: {
                review_id: true,
                review_content: true,
                reply: true,
                rating: true,
                created_at: true,
                updated_at: true,
                reviewimages: {
                    select: {
                        reviewimage_id: true,
                        image_url: true,
                    },
                },
                store: {
                    select: {
                        store_id: true,
                        store_name: true,
                    },
                },
                user: { 
                    select: {
                        nickname: true,
                    },
                },
            },
            orderBy: { review_id: "asc" },
            take: 5,
        });

        // 다음 커서 값 설정 (마지막 리뷰 ID)
        const nextCursor = reviews.length > 0 ? reviews[reviews.length - 1].review_id : null;

        return { reviews, nextCursor };
    } catch (error) {
        console.error("리뷰 목록 조회 중 오류 발생:", error);
        throw new Error("리뷰 목록을 가져오는 중 문제가 발생했습니다.");
    }
};
