import { challengeMissionService } from "../services/user_mission_service.js";

export const challengeMissionController = async (req, res) => {
  const { missionId } = req.params;
  const { userId } = req.body;

  try {
    await challengeMissionService(Number(missionId), Number(userId));
    res.status(201).json({ message: "Mission challenge started successfully." });
  } catch (err) {
    if (err.message === "AlreadyChallenging") {
      return res.status(409).json({ message: "You are already challenging this mission." });
    }
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};
