import { prisma } from "../db.config.js"; 

export const getAllStoreReviews = async (storeId, cursor = 0) => {
    try {
        const reviews = await prisma.review.findMany({
            select: {
                review_id: true,
                review_content: true,
                reply: true,
                created_at: true,
                updated_at: true,
                user: {
                    select: {
                        user_id: true,
                        nickname: true,
                    },
                },
                store: {
                    select: {
                        store_id: true,
                        store_name: true,
                    },
                },
            },
            where: {
                store_id: storeId,
                review_id: { gt: cursor },
            },
            orderBy: { review_id: "asc" },
            take: 5,
        });

        console.log(`${storeId}의 리뷰 목록 조회 완료 (cursor: ${cursor})`);
        return reviews;
    } catch (error) {
        console.error("리뷰 목록 조회 중 오류 발생:", error);
        throw new Error("리뷰 목록을 가져오는 중 문제가 발생했습니다.");
    }
};
