import { prisma } from "../db.config.js";

// User 데이터 삽입
export const upsertUser = async (data) => {
	const existingUser = await prisma.users.findFirst({ where: { email: data.email } });

  if (existingUser) {
    const updated = await prisma.users.update({
      where: { user_id: existingUser.user_id },
      data,
    });
    return updated.user_id;
  }
  
  const created = await prisma.users.create({ data: data });
  return created.user_id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
	const user = await prisma.users.findFirstOrThrow({ where: { user_id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
	await prisma.foodcategories.create({
    data: {
    	user_id: userId,
      category_id: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
	const preferences = await prisma.foodcategories.findMany({
    select: {
      category_id: true,
      user_id: true,
      category_name: true,
    },
    where: { user_id: userId },
    orderBy: { category_id: "asc" },
  });

  return preferences;
};