import { prisma } from "../db.config.js";
import { pool } from "../db.config.js"

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [email]);
  return rows[0] || null;
};

export const addUser = async (data) => {
  const user = await prisma.user.findFirst({
    where: { email: data.email }
  });

  if (user) {
    return null;  // ✅ 중복 이메일 방지
  }

  const created = await prisma.user.create({ data: data });
  return created.id;  // ✅ 생성된 사용자 ID 반환
};

export const getUser = async (userId) => { 
  const user = await prisma.user.findFirstOrThrow({where: { id: userId}});
  return user;
};

export const setPreference = async (userId, preferenceId) => {
  await prisma.userPreference.create({
    data: {
      userId : userId,
      preferenceId: preferenceId,
    },
  });
};

export const getUserPreferencesByUserId = async (userId) => { 
  const preferences = await prisma.userPreference.findMany({
    select: {
      id: true,
      userId: true,
      preferenceId: true,
      preference: true,
    },
    where: {userId: userId},
    orderBy: {preferenceId: "asc"},
  });

  return preferences;
};

// 리뷰 목록 커서
export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: { id: true, content: true, store: true, user: true },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};