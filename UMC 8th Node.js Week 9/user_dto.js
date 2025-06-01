export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
  
    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth,
      address: body.address || "",
      phone_number: body.phoneNumber,
      preferences: body.preferences,
      password: body.password, // 추가
      provider: "local", // 고정값
    };
  };

export const responseFromUser = ({ user, preferences }) => {
  return {
    email: user.email,
    name: user.name,
    gender: user.gender,
    birth: new Date(user.birth),
    address: user.address || "",
    phone_number: user.phone_number,
    preferences: preferences.map((pref) => ({
      id: pref.category_id,
      name: pref.category_name,
    })),
  };
};  

