import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import {
  handleUserSignUp,
  addUserMission,
  getUserMissions,
  handleListUserReviews,
  completeUserMission,
  completeUserProfile,
} from "./controllers/user.controller.js";
import {
  handleStoreCreation,
  addReview,
  createMission,
  handleListStoreReviews,
  handleListMissions,
} from "./controllers/store.controller.js";
import { addReviewImageHandler } from "./controllers/reviewimage.controller.js";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";

// ENV 설정
dotenv.config();

// 앱 초기화
const app = express();
const port = process.env.PORT;

// 미들웨어 설정
app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함.(JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

// 헬퍼 함수 등록: 반드시 라우트보다 먼저
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

// Passport 설정
passport.use(googleStrategy); // passport 라이브러리에 정의한 로그인 방식
// Session에 사용자 정보를 저장할 때, 정보를 가져올 때
passport.serializeUser((user, done) => done(null, user)); 
passport.deserializeUser((user, done) => done(null, user));

// 세션 설정
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일 ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
    }),
  })
);

// Passport 초기화
app.use(passport.initialize());
app.use(passport.session());

// OAuth Google 로그인 라우트
app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => {
      return res.redirect("/");
  }
);

// 기본 라우트
app.get("/", (req, res) => {
  console.log("오잉");
  console.log(req.user);
  res.send("Hello World!");
});

// Swagger 문서
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null";
  const routes = ["./index.js"];
  const doc = {
    info: {
      title: "UMC 8th",
      description: "UMC 8th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

// ------------------- API 라우트 -------------------

// 회원 가입 API
app.post("/api/v1/user/signup", handleUserSignUp);

// 지역별 가게 정보 추가 API
app.post("/api/v1/regions/:region_id/stores", handleStoreCreation);

// 리뷰 작성 API
app.post("/api/v1/review/:store_id/:user_id", addReview);

// 리뷰에 이미지 추가 API
app.post("/api/v1/images/review/:review_id", addReviewImageHandler);

// 가게에 미션 추가 API
app.post("/api/v1/mission/:store_id", createMission);

// 도전 중 미션 조회 API
app.get("/api/v1/user/:user_id/missions", getUserMissions);

// 도전 중 미션 추가 API
app.post("/api/v1/user-mission/:user_id", addUserMission);

// 가게 리뷰 목록 조회 API
app.get("/api/v1/stores/:store_id/reviews", handleListStoreReviews);

// 내가 작성한 리뷰 목록 조회 API
app.get("/api/v1/reviews/:user_id/own", handleListUserReviews);

// 가게 미션 목록 조회 API
app.get("/api/v1/stores/:store_id/missions", handleListMissions);

// 나의 진행 중 미션을 완료 처리
app.put("/api/v1/update/:user_id/:mission_id/user-mission", completeUserMission);

// google 연동 로그인한 사용자가 추가 정보 입력
app.post("/api/v1/add/complete/profile", completeUserProfile);

// ------------------- 전역 에러 핸들러 -------------------
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
