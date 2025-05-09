import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleStoreCreation } from "./controllers/store.controller.js";
import { addReview } from "./controllers/review.controller.js";
import { addReviewImage } from "./controllers/reviewimage.controller.js";
import { createMission } from "./controllers/mission.controller.js";
import { getUserMissions } from "./controllers/usermission.controller.js";
import { addUserMission } from "./controllers/usermission.controller.js";
import { prisma, pool } from "./db.config.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 회원 가입 API
app.post("/api/v1/user/signup", handleUserSignUp);
// 지역별 가게 정보 추가 API
app.post("/api/v1/regions/:regionId/stores", handleStoreCreation);
// 리뷰 작성 API
app.post("/api/v1/review/:store_id/:user_id", addReview);
// 리뷰에 이미지 추가 API
app.post("/api/v1/images/review/:review_id", addReviewImage);
// 가게에 미션 추가 API
app.post("/api/v1/mission/:store_id", createMission);
// 도전 중 미션 확인 - 커서 페이지네이션
app.get("/api/v1/user/:user_id/missions", getUserMissions);
// 도전 중 미션 추가
app.post("/api/v1/user-mission/:user_id", addUserMission);
// 리뷰 목록 조회
app.get("/api/v1/stores/:store_id/reviews", handleListStoreReviews);
// 내가 작성한 리뷰 목록 조회
// app.get("/api/v1/reviews/:user_id/own",)




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

