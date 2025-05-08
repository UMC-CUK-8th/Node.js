export const createReviewDTO = (data) => {
    // ✅ 필수 필드 검증 (store_id, user_id 제거 → URL에서 받으므로)
    const requiredFields = ["rating", "review_content"];
    if (requiredFields.some((field) => !data[field])) {
      throw new Error(`❌ Missing required fields: ${requiredFields.join(", ")}`);
    }
  
    return {
      rating: data.rating,
      review_content: data.review_content,
    };
  };
  