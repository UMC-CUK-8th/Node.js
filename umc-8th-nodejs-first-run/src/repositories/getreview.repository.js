import {prisma} from "../db.config.js";

export const getAllStoreReviews = async (storeId) => {
    const reviews = await prisma.userStoreReview.findMany({
        select: {
            reviewId: true,
            content: true,
            storeId: true,
            userId: true,
            storeId: true,
            userId: true,
        },
        where: {storeId: storeId, reviewId: {gt: cursor}},
        orderBy: {reviewId: "asc"},
        take: 5,
    });
    
    return reviews;
};