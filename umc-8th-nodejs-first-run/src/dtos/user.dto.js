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
    const preferFoods = preferences.map(
      (preference) => preference.preference.name
    );

    return {
      email: user.email,
      name: user.name,
      preferCategoty: preferFoods,
    };
  };
  