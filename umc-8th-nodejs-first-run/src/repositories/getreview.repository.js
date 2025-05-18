import { prisma } from "../db.config.js"; 

export const getAllStoreReviews = async (storeId, cursor = 0 ) => {

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

    return reviews;
};
