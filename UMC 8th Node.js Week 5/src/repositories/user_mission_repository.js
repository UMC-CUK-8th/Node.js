import { pool } from "../db.config.js";

export const findUserMission = async (userId, missionId) => {
  const [rows] = await pool.query(
    `SELECT * FROM User_Mission WHERE user_id = ? AND mission_id = ?`,
    [userId, missionId]
  );
  return rows[0] || null;
};

export const saveUserMission = async ({ userId, missionId }) => {
  await pool.query(
    `INSERT INTO User_Mission (user_id, mission_id, status, challenged_at)
     VALUES (?, ?, 'in_progress', NOW())`,
    [userId, missionId]
  );
};
