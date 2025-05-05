import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user_controller.js";
import { createStore } from "./controllers/store_controller.js";
import { addReviewController } from "./controllers/review_controller.js";
import { addMissionController } from "./controllers/mission_controller.js";
import { challengeMissionController } from "./controllers/user_mission_controller.js";


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post("/users/sign-up", handleUserSignUp);
app.post("/regions/:regionId/stores", createStore);                      // 특정 지역에 가게 추가
app.post("/stores/:storeId/reviews", addReviewController);               // 리뷰 등록
app.post("/stores/:storeId/missions", addMissionController);             // 가게에 미션 추가
app.post("/missions/:missionId/challenge", challengeMissionController);  // 유저가 미션 도전

app.listen(port, () => {
  console.log(`Example app listening on port ${3000}`);
});