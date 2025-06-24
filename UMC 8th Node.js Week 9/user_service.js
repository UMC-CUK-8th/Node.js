import { responseFromUser } from "../dtos/user_dto.js";
import {
  upsertUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user_repository.js";

export const userSignUp = async (data) => {
  const userId = await upsertUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    phone_number: data.phone_number,
  });

if (data.preferences?.length > 0) {
  for (const preference of data.preferences) {
    await setPreference(userId, preference);
  }
}

const user = await getUser(userId);
const preferences = await getUserPreferencesByUserId(userId);

return responseFromUser({ user, preferences });
};