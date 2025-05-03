import { StatusCodes } from "http-status-codes";
import { createUserMissionDTO } from "../dtos/usermission.dto.js";
import { addUserMissionService, getUserMissionsService } from "../services/usermission.service.js";

// ✅ 특정 사용자의 진행 중인 미션 조회
export const getUserMissions = async (req, res) => {
  try {
    const user_id = Number(req.params.user_id);
    console.log("🔹 받은 user_id:", user_id);

    const userMissions = await getUserMissionsService(user_id);

    res.status(StatusCodes.OK).json({
      message: "User missions retrieved successfully",
      missions: userMissions,
    });
  } catch (error) {
    res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message || "Internal Server Error",
    });
  }
};

// ✅ 사용자가 새로운 미션에 도전 (`in_progress` 상태로 추가)
export const addUserMission = async (req, res) => {
  try {
    const user_id = Number(req.params.user_id); // ✅ URL에서 user_id 가져오기
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
