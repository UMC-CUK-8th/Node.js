export const responseFromReview = (review) => {
    return {
        reviewId: review.review_id,
        reviewContent: review.review_content,
        reply: review.reply ?? null, 
        rating: review.rating,
        createdAt: review.created_at,
        updatedAt: review.updated_at,
        userNickname: review.user.nickname,
        images: review.reviewimages.map(image => ({
            reviewImageId: image.reviewimage_id,
            imageUrl: image.image_url,
        })),
        store: {
            storeId: review.store.store_id,
            name: review.store.store_name,
        },
    };
};
