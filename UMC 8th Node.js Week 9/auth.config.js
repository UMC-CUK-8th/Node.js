import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { Strategy as LocalStrategy } from 'passport-local';
import { comparePassword } from './hash.js';
import { prisma } from "./db.config.js";

dotenv.config();

// Google 로그인 회원가입 관련 전략
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

// 사용자 로그인 후 정보 조회
const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.users.findFirst({ where: { email } });
  if (user) {
    if (user.provider !== 'google') {
      throw new Error(`이미 '${user.provider}' 방식으로 가입된 이메일입니다.`);
    }
    return { id: user.user_id, email: user.email, name: user.name };
  }

  const created = await prisma.users.create({
    data: {
      email, // Google에서 받아온 데이터
      name: profile.displayName, // Google에서 받아온 데이터
      provider: 'google', // Google로 가입
      gender: "male", // 이 아래로는 전부 하드코딩
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      phone_number: "추후 수정",
    },
  });

  return { id: created.user_id, email: created.email, name: created.name };
};


// Kakao 로그인 회원가입 관련 전략
export const kakaoStrategy = new KakaoStrategy(
  {
    clientID: process.env.PASSPORT_KAKAO_CLIENT_ID,
    callbackURL: "http://localhost:3000/oauth2/callback/kakao",
    scope: ["account_email", "profile_nickname"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return kakaoVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

// 사용자 로그인 후 정보 조회
const kakaoVerify = async (profile) => {
  const kakaoAccount = profile._json?.kakao_account;
  const email = kakaoAccount?.email;
  // const email = profile._json?.kakao_account?.email;
  if (!email) {
    throw new Error(`kakaoAccount?.email was not found: ${JSON.stringify(profile)}`);
  }

  const user = await prisma.users.findFirst({ where: { email } });
  if (user) {
    if (user.provider !== 'kakao') {
      throw new Error(`이미 '${user.provider}' 방식으로 가입된 이메일입니다.`);
    }
    return { id: user.user_id, email: user.email, nickname: user.nickname };
  }

  const created = await prisma.users.create({
    data: {
      email,
      nickname: kakaoAccount?.profile?.nickname,
      provider: 'kakao', // Kakao로 가입
      gender: "female",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      phone_number: "추후 수정",
    },
  });

  return { id: created.user_id, email: created.email, nickname: created.nickname };
};


// email과 password 이용한 로그인 전략
export const localStrategy = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await prisma.users.findUnique({ where: { email } });

      if (!user) {
        return done(null, false, { message: '존재하지 않는 이메일입니다.' });
      }

      if (user.provider !== 'local') {
        return done(null, false, { message: `'${user.provider}' 방식으로 가입된 이메일입니다.` });
}

      const isValid = await comparePassword(password, user.password);
      if (!isValid) {
        return done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
      }


      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) return done(null, false, { message: 'Incorrect password' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);
