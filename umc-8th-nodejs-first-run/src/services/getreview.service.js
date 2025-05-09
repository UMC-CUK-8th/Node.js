import { responseFromReviews } from "../dtos/getreview.dto.js";

export const listStoreReview = async (storeId) => {
    const reviews = await getAllStoreReviews(storeId);
    return responseFromRevies(reviews);
};