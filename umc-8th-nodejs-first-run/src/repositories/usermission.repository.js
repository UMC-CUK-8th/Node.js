import { pool } from "../db.config.js";

// ✅ 특정 사용자의 진행 중인 미션 조회
export const findUserMissionsRepository = async (userId) => {
  const [missions] = await pool.query(
    `SELECT um.user_mission_id, m.mission_content, m.reward_point, um.mission_status, um.start_at, um.completed_at
     FROM User_mission um
     JOIN Mission m ON um.mission_id = m.mission_id
     WHERE um.user_id = ? AND um.mission_status = 'in_progress'`,
    [userId]
  );

  return missions;
};

// ✅ 새로운 미션을 `in_progress` 상태로 추가
export const addUserMissionRepository = async (userMissionData) => {
  const [result] = await pool.query(
    `INSERT INTO User_mission (mission_id, user_id, region_id, mission_status, start_at, completed_at) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      userMissionData.mission_id,
      userMissionData.user_id,
      userMissionData.region_id,
      userMissionData.mission_status,
      userMissionData.start_at,
      userMissionData.completed_at,
    ]
  );

  console.log("✅ 새로운 미션 시작!", result.insertId);

  return {
    user_mission_id: result.insertId,
    ...userMissionData,
  };
};
