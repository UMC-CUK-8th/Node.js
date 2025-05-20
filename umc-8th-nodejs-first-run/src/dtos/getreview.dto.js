export const responseFromReview = (review) => {
    return {
      reviewId: review.review_id,
      content: review.review_content,
      reply: review.reply ?? null,
      createdAt: review.created_at?.toISOString?.() ?? review.created_at,
      updatedAt: review.updated_at?.toISOString?.() ?? review.updated_at,
      user: review.user ? {
        userId: review.user.user_id,
        nickname: review.user.nickname,
      } : null,
      store: review.store ? {
        storeId: review.store.store_id,
        name: review.store.store_name,
      } : null,
    };
  };
  