import { createStoreService } from "../services/store.service.js";
import { validateStoreDto } from "../dtos/store.dto.js";

export const createStore = async (req, res) => {
  const regionId = parseInt(req.params.regionId, 10);
  const dto = req.body;

  if (!validateStoreDto(dto)) {
    return res.status(400).json({ message: '필수값 누락' });
  }

  if (isNaN(regionId)) {
    return res.status(400).json({ message: '잘못된 regionId' });
  }  

  try {
    const newStore = await createStoreService(regionId, dto);
    res.status(201).json(newStore);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'DB 오류', error: error.message });
  }
};
