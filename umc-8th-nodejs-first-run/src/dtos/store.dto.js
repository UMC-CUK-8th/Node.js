export const bodyToStore = (body, regionId) => {
    if (!regionId) {
        throw new Error("regionId가 없습니다!");
      }
    return {
      regionId, // URL에서 받은 regionId
      storeName: body.store_name,
      storeImageUrl: body.store_image_url || "",
      openingHours: body.opening_hours || "00:00-00:00",
      openStatus: body.open_status || "CLOSED",
      location: body.location || "",
      cuisine: body.cuisine || "기타",
      averageRating: body.average_rating || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  };
  
  export const responseFromStore = (store) => {
    return {
      storeId: store.store_id,
      regionId: store.region_id,
      storeName: store.store_name,
      storeImageUrl: store.store_image_url,
      openingHours: store.opening_hours,
      openStatus: store.open_status,
      location: store.location,
      cuisine: store.cuisine,
      averageRating: store.average_rating,
      createdAt: store.created_at,
      updatedAt: store.updated_at,
    };
  };
  