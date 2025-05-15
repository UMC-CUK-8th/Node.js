import { prisma } from "../db.config.js";

// 이메일로 사용자 조회
export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

// 사용자 추가 (중복 이메일 방지)
export const addUser = async (data) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    return null; // 이미 존재하는 이메일
  }

  const createdUser = await prisma.user.create({ data });
  return createdUser.id;
};

// 사용자 정보 조회
export const getUser = async (userId) => {
  return await prisma.user.findUniqueOrThrow({
    where: { id: userId },
  });
};

// 사용자 선호 설정
export const setPreference = async (userId, preferenceId) => {
  await prisma.userPreference.create({
    data: {
      userId,
      preferenceId,
    },
  });
};

// 특정 사용자 선호도 조회
export const getUserPreferencesByUserId = async (userId) => {
  return await prisma.userPreference.findMany({
    select: {
      id: true,
      userId: true,
      preferenceId: true,
      preference: true,
    },
    where: { userId },
    orderBy: { preferenceId: "asc" },
  });
};