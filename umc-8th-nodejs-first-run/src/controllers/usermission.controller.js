import { StatusCodes } from "http-status-codes";
import { getUserMissionsService } from "../services/usermission.service.js";
import { completeUserMissionService } from "../services/usermission.service.js";

export const getUserMissions = async (req, res) => {
  try {
    const user_id = Number(req.params.user_id);
    const cursor = req.query.cursor ? Number(req.query.cursor) : null; // 커서 값
    const limit = req.query.limit ? Number(req.query.limit) : 10; // 10개 조회

    console.log("받은 user_id:", user_id);
    console.log("받은 cursor:", cursor);
    console.log("받은 limit:", limit);

    const userMissionsData = await getUserMissionsService(user_id, cursor, limit);

    res.status(StatusCodes.OK).json({
      message: "User missions retrieved successfully",
      data: userMissionsData,
    });
  } catch (error) {
    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Internal Server Error",
    });
  }
};

// 사용자가 새로운 미션에 도전 (`in_progress` 상태로 추가)
export const addUserMission = async (req, res) => {
  try {
    const user_id = Number(req.params.user_id); // URL에서 user_id 가져오기
    console.log("🔹 받은 user_id:", user_id);

    const userMissionData = createUserMissionDTO(req.body, user_id); // DTO 검증 및 변환
    console.log("🔹 받은 userMissionData:", userMissionData);

    const newUserMission = await addUserMissionService(userMissionData);

    res.status(StatusCodes.CREATED).json({
      message: "User mission started successfully",
      userMission: newUserMission,
    });
  } catch (error) {
    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Internal Server Error",
    });
  }
};

// 미션 상태를 완료로 업데이트
export const completeUserMission = async (req, res) => {
  try {
    const user_id = Number(req.params.user_id);
    const mission_id = Number(req.params.mission_id);

    console.log("🔹 완료할 user_id:", user_id);
    console.log("🔹 완료할 mission_id:", mission_id);

    const updatedMission = await completeUserMissionService(user_id, mission_id);

    res.status(StatusCodes.OK).json({
      message: "User mission completed successfully",
      updatedMission,
    });
  } catch (error) {
    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Internal Server Error",
    });
  }
};
