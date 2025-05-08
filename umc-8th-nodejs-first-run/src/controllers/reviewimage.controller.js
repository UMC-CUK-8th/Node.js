import { StatusCodes } from "http-status-codes";
import { createReviewImageDTO } from "../dtos/reviewimage.dto.js";
import { addReviewImageService } from "../services/reviewimage.service.js";

export const addReviewImage = async (req, res) => {
  try {
    const review_id = Number(req.params.review_id); // ✅ review_id를 숫자로 변환
    console.log("🔹 받은 review_id:", review_id);

    // ✅ 먼저 DTO로 변환 및 검증을 수행한 후 사용
    const reviewImageData = createReviewImageDTO(req.body);
    console.log("🔹 받은 reviewImageData:", reviewImageData);

    const newReviewImage = await addReviewImageService(review_id, reviewImageData);

    res.status(StatusCodes.CREATED).json({
      message: "Review image uploaded successfully",
      reviewImage: newReviewImage,
    });
  } catch (error) {
    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Internal Server Error",
    });
  }
};

