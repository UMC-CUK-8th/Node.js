import { pool } from "../db.config.js";

export const saveMission = async ({
  missionId,
  storeId,
  missionName,
  description,
  rewardPoint,
  ownerNumber,
  dueDate,
}) => {
  await pool.query(
    `INSERT INTO Missions (mission_id, store_id, mission_name, description, reward_point, owner_number, due_date)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [missionId, storeId, missionName, description, rewardPoint, ownerNumber, dueDate]
  );
};
