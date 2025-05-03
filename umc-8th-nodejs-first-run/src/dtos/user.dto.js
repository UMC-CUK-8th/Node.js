export const bodyToUser = (body) => {
    return {
      email: body.email,
      name: body.name,
      nickname: body.nickname,
      gender: body.gender,
      birth: new Date(body.birth),
      address: body.address || "",
      phone_number: body.phone_number, // camelCase 스타일 유지
      is_agreed: body.is_agreed,
      sns_id: body.sns_id,
      profile_image_url: body.profile_image_url || "",
      preferences: body.preference || [], // preference → preferences (배열 형태)
    };
  };
  
  export const responseFromUser = ({ user, preferences }) => {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      nickname: user.nickname,
      gender: user.gender,
      birth: user.birth,
      address: user.address,
      phone_number: user.phone_number, // camelCase 스타일 유지
      preferences: preferences.map((preference) => ({
        id: preference.id,
        name: preference.preference_name,
      })),
    };
  };
  