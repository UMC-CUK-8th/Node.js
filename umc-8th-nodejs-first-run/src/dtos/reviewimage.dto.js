export const createReviewImageDTO = (data) => {
  if (!data.image_url) {
    throw new Error("❌ Missing required field: image_url");
  }
  return { image_url: data.image_url };
};
