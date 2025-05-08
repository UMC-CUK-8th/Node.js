import { addMissionService } from "../services/mission_service.js";

export const addMissionController = async (req, res) => {
  const { storeId } = req.params;
  const missionData = req.body;

  try {
    await addMissionService(Number(storeId), missionData);
    res.status(201).json({ message: "Mission added successfully." });
  } catch (err) {
    if (err.message === "StoreNotFound") {
      return res.status(404).json({ message: "Store not found." });
    }
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};
