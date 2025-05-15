export const responseFromReview = (review) => {
    return {
        reviewId: review.review_id,
        content: review.review_content,
        reply: review.reply ?? null, 
        createdAt: review.created_at,
        updatedAt: review.updated_at,
        user: {
            userId: review.user.user_id,
            nickname: review.user.nickname, 
        },
        store: {
            storeId: review.store.store_id,
            name: review.store.store_name, 
        },
    };
};
