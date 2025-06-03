import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as NaverStrategy } from "passport-naver-v2";
import { prisma } from "./db.config.js";

dotenv.config();

export const googleStrategy = new GoogleStrategy(
    {
      clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/oauth2/callback/google",
      scope: ["email", "profile"],
      state: true,
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log("Google profile:", profile) // 오류 검증을 위해 추가한 코드

      return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
    }
  );  

  const googleVerify = async (profile) => {
    const email = profile.emails?.[0].value;
    if(!email) {
        throw new Error(`profile.email was not found: ${profile}`);
    }

    const user = await prisma.user.findFirst({where: { email }});
    if(user != null) {
        return { id: user.user_id, email: user.email, name: user.nickname }
    }

    const created = await prisma.user.create({
      data: {
        email,
        name: profile.displayName,
        sns_id: profile.id,
        sns_provider: "google", 
        gender: "none", // 기본값 설정
        birth: new Date(1970, 0, 1),
        profile_image_url: profile.photos?.[0]?.value || '',
        address: "추후 수정",
        phone_number: "추후 수정",
        nickname: "추후 수정",
      },
    });
    

    return { id: created.id, email: created.email, name: created.name };
  };

  export const naverStrategy = new NaverStrategy(
    {
      clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
      clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/oauth2/callback/naver",
      scope: ["email", "profile"],
      state: true,
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log("Naver profile:", profile) // 오류 검증을 위해 추가한 코드

      return naverVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
    }
  );  

  const naverVerify = async (profile) => {
    const response = profile._json?.response ?? profile.response;
  
    const email = response?.email;
    if (!email) {
      throw new Error(`profile.email was not found: ${JSON.stringify(profile)}`);
    }
  
    const user = await prisma.user.findFirst({ where: { email } });
    if (user != null) {
      return { id: user.user_id, email: user.email, name: user.nickname };
    }
  
    const created = await prisma.user.create({
      data: {
        email,
        name: response.name,
        nickname: response.nickname,
        sns_id: response.id,
        sns_provider: "naver",
        gender: response.gender === "F" ? "female" : "male",
        birth: new Date(1970, 0, 1), 
        profile_image_url: response.profile_image || '',
        address: "추후 수정",
        phone_number: "추후 수정",
        nickname: response.nickname || "추후 수정",
      },
    });
  
    return { id: created.id, email: created.email, name: created.name };
  };  