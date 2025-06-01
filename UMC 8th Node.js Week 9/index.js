import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy } from "./auth.config.js";
import { kakaoStrategy } from "./auth.config.js";
import { localStrategy } from './auth.config.js';
import { prisma } from "./db.config.js";
import { setupSwagger } from "../swagger/swagger.config.js";
import { handleUserSignUp } from "./controllers/user_controller.js";
import { handleAddStore } from "./controllers/add_store_controller.js";
import { createReview } from "./controllers/review_controller.js";
import { handleAddStoreMission } from "./controllers/add_store_mission_controller.js";
import { handleChallengeMission } from "./controllers/challenge_mission_controller.js";

dotenv.config(); // .env 파일을 읽어서 process.env에 적용

const app = express();
const port = process.env.PORT; // 포트는 .env에서 읽음

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms (일주일)
    },
    resave: false, // 매 요청마다 세션 다시 저장할지 -> 변경사항 없으면 세션 다시 저장 안함
    saveUninitialized: false, // 새로 생성괸 세션에 내용 없으면 저장 안함 -> 로그인하지 않은 사용자의 세션은 저장되지 않음
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms 2분마다 만료 세션 정리
      dbRecordIdIsSessionId: true, // 세선 ID를 DB의 PK로 사용
      dbRecordIdFunction: undefined, // (옵션) 세션 ID 생성 커스터마이징
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(googleStrategy); //로그인 방식 등록 (Google)
passport.use(kakaoStrategy); // 로그인 방식 등록 (Kakao)
passport.use(localStrategy); // 로그인 방식 등록 (Local)

passport.serializeUser((user, done) => done(null, user)); // Session에 사용자 정보 저장
passport.deserializeUser((user, done) => done(null, user)); // Session에서 사용자 정보 조회 (가져옴)

app.get("/", (req, res) => {
  console.log(req.user);
  res.send("Hello World!");
});

app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

app.get(
  "/oauth2/login/kakao",
  passport.authenticate("kakao", {
    scope: ["account_email", "profile_nickname"],
  })
);
app.get(
  "/oauth2/callback/kakao",
  passport.authenticate("kakao", {
    failureRedirect: "/oauth2/login/kakao",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

app.post(
  "/auth/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login-fail",
    failureMessage: true,
  }),
  (req, res) => {
    res.redirect("/"); // 로그인 성공 후 리다이렉트
  }
);

app.get("/auth/login-fail", (req, res) => {
  res.status(401).json({ message: "로그인 실패" });
});

setupSwagger(app); // docs 경로에 Swagger UI 연결

app.post("/users/sign-up", handleUserSignUp); // 회원가입 라우터
app.post("/regions/:regionId/stores", handleAddStore); // 특정 지역에 가게 추가 라우터
app.post("/reviews/:storeId", createReview); // 가게에 리뷰 추가 라우터
app.post("/stores/:storeId/missions", handleAddStoreMission); // 가게에 리뷰 추가 라우터
app.post("/missions/:missionId/challenge", handleChallengeMission); // 미션 도전하기 라우터

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});