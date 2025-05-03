import { pool } from "../db.config.js";

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [email]);
  return rows[0] || null;
};

export const addUser = async (userData) => {
  try {
    const [result] = await pool.query(
      `INSERT INTO user (email, name, nickname, gender, birth, address, phone_number, sns_id, profile_image_url, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        userData.email,
        userData.name,
        userData.nickname,
        userData.gender,
        userData.birth,
        userData.address,
        userData.phone_number, 
        userData.sns_id, 
        userData.profile_image_url 
      ]
    );

    return result.insertId;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return null;
    }
    throw new Error(`회원가입 중 오류 발생: ${error.message}`);
  }
};

export const getUser = async (userId) => { 
  const [rows] = await pool.query("SELECT * FROM user WHERE user_id = ?", [userId]); 
  return rows[0] || null;
};

export const getUserPreferencesByUserId = async (userId) => { 
  const [rows] = await pool.query(
    `SELECT p.preference_id, p.preference_name 
     FROM user_preference up 
     JOIN preference p ON up.preference_id = p.preference_id 
     WHERE up.user_id = ?`,
    [userId] // 수정된 변수명 반영
  );
  return rows;
};

export const setPreference = async (userId, preferenceId) => { 
  await pool.query(
    `INSERT INTO user_preference (user_id, preference_id) VALUES (?, ?)`,
    [userId, preferenceId]
  );
};
