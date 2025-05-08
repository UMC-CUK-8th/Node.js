import { responseFromUser } from "../dtos/user.dto.js";
import { addUser, getUser, getUserPreferencesByUserId, setPreference } from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const userId = await addUser({
    email: data.email,
    name: data.name,
    nickname: data.nickname,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    phone_number: data.phone_number,
    sns_id: data.sns_id,
    profile_image_url: data.profile_image_url,
  });

  if (!userId) { 
    throw new Error("이미 존재하는 이메일입니다.");
  }

  // 🟢 사용자의 선호도를 저장 (UserPreference에 추가)
  await prisma.userPreference.createMany({
    data: data.preferences.map(preferenceId => ({
      userId,
      preferenceId,
    })),
  });

  const user = await getUser(userId); 
  const preferences = await getUserPreferencesByUserId(userId);

  return responseFromUser({ user, preferences });
};

