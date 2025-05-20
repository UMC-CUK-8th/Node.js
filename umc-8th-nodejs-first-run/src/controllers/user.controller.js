import { StatusCodes } from "http-status-codes";
import { 
  bodyToUser,
  createUserMissionDTO,
 } from "../dtos/user.dto.js";

import { 
  userSignUp,
  checkUserExists, 
  getUserMissionsService,
  completeUserMissionService,
  addUserMissionService,
  checkMissionExists,
  listUserReviewsService,
} from "../services/user.service.js";

// 회원가입
export const handleUserSignUp = async (req, res, next) => {
  try{
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body);
  
    const user = await userSignUp(bodyToUser(req.body));
  
    res.status(StatusCodes.OK).success({
      resultType: "SUCCESS",
      message: null,
      data: user,
    });
  }catch (error){
    return next(error);
  }
};

// 사용자 리뷰 조회
export const handleListUserReviews = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.user_id);
        const cursor = req.query.cursor ? parseInt(req.query.cursor) : 0;

        if (isNaN(userId)) {
            throw new Error("userId가 올바르지 않습니다.");
        }

        await checkUserExists(userId);
        const reviews = await listUserReviewsService(userId, cursor);

        res.status(StatusCodes.OK).success ({
          resultType: "SUCCESS",
          message: null,
          data: reviews,
        });
        } catch (error) {
            return next(error);
        }
};

// 사용자 미션 조회
export const getUserMissions = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.user_id);
    if (isNaN(userId)) {
      throw new error("userId값이 올바르지 않습니다.", { user_id });
    }

    const cursor = req.query.cursor ? Number(req.query.cursor) : null; // 커서 값
    const limit = req.query.limit ? Number(req.query.limit) : 10; // 10개 조회

    await checkUserExists(userId);

    const userMissionsData = await getUserMissionsService(userId, cursor, limit);

    res.status(StatusCodes.OK).success({
      resutType: "SUCCESS",
      message: null,
      data: userMissionsData,
    });
  } catch (error) {
    return next(error);
  }
};

// 사용자가 새로운 미션에 도전 (`in_progress` 상태로 추가)
export const addUserMission = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.user_id);

    if (isNaN(userId)) {
      throw new Error("userId값이 올바르지 않습니다.", { user_id });
    }

    await checkUserExists(userId);

    const userMissionData = createUserMissionDTO(req.body, userId); // DTO 검증 및 변환
    const newUserMission = await addUserMissionService(userId, userMissionData);

    res.status(StatusCodes.OK).success({
      resultType: "SUCCESS",
      message: null,
      data: newUserMission,
    });
  } catch (error) {
    return next(error);
  }
};

// 미션 상태를 완료로 업데이트
export const completeUserMission = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.user_id);
    const missionId = parseInt(req.params.mission_id);

    if (isNaN(userId)) {
      throw new error("userId값이 올바르지 않습니다.", { user_id });
    }

    if (isNaN(missionId)) {
      throw new error("missionId값이 올바르지 않습니다.", { mission_id });
    }

    await checkUserExists(userId);
    await checkMissionExists(missionId);

    const updatedMission = await completeUserMissionService(userId, missionId);

    res.status(StatusCodes.OK).success({
      resutType: "SUCCESS",
      message: null,
      data: updatedMission,
    });
  } catch (error) {
    return next(error);
  }
};