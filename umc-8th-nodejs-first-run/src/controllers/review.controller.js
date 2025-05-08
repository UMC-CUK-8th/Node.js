import { StatusCodes } from "http-status-codes";
import { createReviewDTO } from "../dtos/review.dto.js";
import { addReviewService } from "../services/review.service.js";

export const addReview = async (req, res) => {
  try {
    const { store_id, user_id } = req.params; // ✅ URL에서 store_id와 user_id 가져오기
    const reviewData = createReviewDTO(req.body); // DTO 변환 및 검증

    console.log("🔹 받은 store_id:", store_id);
    console.log("🔹 받은 user_id:", user_id);
    console.log("🔹 받은 reviewData:", reviewData);

    const newReview = await addReviewService(store_id, user_id, reviewData); // 서비스 호출

    res.status(StatusCodes.CREATED).json({
      message: "Review created successfully",
      review: newReview,
    });
  } catch (error) {
    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Internal Server Error",
    });
  }
};
