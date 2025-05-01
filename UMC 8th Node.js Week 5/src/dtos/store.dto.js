export function validateStoreDto(body) {
    const { store_category_id, store_name, store_address, operating_hours } = body;
    if (
      !store_category_id ||
      !store_name ||
      !store_address ||
      !operating_hours
    ) {
      return false;
    }
    return true;
  }
  