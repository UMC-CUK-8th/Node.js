import { addReviewService } from "../services/review_service.js";

export const addReviewController = async (req, res) => {
  const { storeId } = req.params;
  const reviewData = req.body;

  try {
    await addReviewService(storeId, reviewData);
    res.status(201).json({ message: "Review added successfully." });
  } catch (err) {
    if (err.message === "StoreNotFound") {
      return res.status(404).json({ message: "Store not found." });
    }
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};