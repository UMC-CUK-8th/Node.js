import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { 
  handleUserSignUp,
  addUserMission,
  getUserMissions,
  handleListUserReviews,
  completeUserMission
} from "./controllers/user.controller.js";
import { 
  handleStoreCreation,
  addReview,
  createMission,
  handleListStoreReviews,
  handleListMissions
 } from "./controllers/store.controller.js";
import { addReviewImageHandler } from "./controllers/reviewimage.controller.js"; 
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

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
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
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

//공통 응답을 사용할 수 있는 헬퍼 함수 등록
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({resultType: "SUCCESS", error: null, success});
  };

  res.error = ({errorCode = "unknown", reason = null, data = null}) => {
    return res.json({
      resultType: "FAIL",
      error: {errorCode, reason, data},
      success: null,
    });
  };

  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

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
// 도전 중 미션 조회 API - 커서 페이지네이션 추가
app.get("/api/v1/user/:user_id/missions", getUserMissions);
// 도전 중 미션 추가 API 
app.post("/api/v1/user-mission/:user_id", addUserMission);
// 가게의 리뷰 목록 조회 API - 커서 페이지네이션 추가
app.get("/api/v1/stores/:store_id/reviews", handleListStoreReviews);
// 내가 작성한 리뷰 목록 조회 API - 커서 페이지네이션 추가
app.get("/api/v1/reviews/:user_id/own", handleListUserReviews);
// 가게의 미션 목록 조회 API - 커서 페이지네이션 추가
app.get("/api/v1/stores/:store_id/missions", handleListMissions)
// 나의 진행 중 미션을 진행 완료로 바꾸기 
app.put("/api/v1/update/:user_id/:mission_id/user-mission", completeUserMission)

// 전역 오류를 처리하기 위한 미들웨어
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});