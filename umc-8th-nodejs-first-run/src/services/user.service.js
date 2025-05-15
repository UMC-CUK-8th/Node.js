import { responseFromUser } from "../dtos/user.dto.js";
import { prisma } from "../db.config.js";
import { addUser, getUser, getUserPreferencesByUserId, setPreference } from "../repositories/user.repository.js";
import { DuplicateUserEmailError } from "../errors.js";

//회원가입
export const userSignUp = async (data) => {
  // 이메일 중복 확인
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  });

  if (existingUser) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  // prisma 사용, 회원 정보 저장
  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      nickname: data.nickname,
      gender: data.gender,
      birth: new Date(data.birth),
      address: data.address,
      phone_number: data.phone_number,
      sns_provider: data.sns_provider,
      sns_id: data.sns_id,
      status: data.status,
      profile_image_url: data.profile_image_url,
      user_point: data.user_point ?? 0,
      is_phone_verified: data.is_phone_verified,
    },
  });
  
  // 사용자의 선호도 저장, UserPreference에 추가
  if (data.preferences && data.preferences.length > 0) {
    await prisma.userPreference.createMany({
      data: data.preferences.map((preferenceId) => ({
        user_id: newUser.user_id,
        preference_id: preferenceId,

      }))
    });
  }

  // 사용자 정보 조회 및 반환
  const user = await prisma.user.findUnique({
    where: { user_id: newUser.user_id },
    include: {
      userPreferences: {
        include: {
          preference: true,
        },
      },
    },
  });  

  return responseFromUser(user);
};