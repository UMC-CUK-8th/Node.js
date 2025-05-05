export const validateStoreDto = (body) => {
  const { store_category_id, store_name, store_address, operating_hours } = body;
  return !!(store_category_id && store_name && store_address && operating_hours);
};

export const bodyToStore = (body) => ({
  store_category_id: body.store_category_id,
  store_name: body.store_name,
  store_address: body.store_address,
  operating_hours: body.operating_hours,
});