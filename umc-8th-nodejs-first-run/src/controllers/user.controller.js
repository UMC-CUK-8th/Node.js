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
  checkUserEmailExists,
  checkUserNicknameExists,
} from "../services/user.service.js";

// 회원가입
export const handleUserSignUp = async (req, res, next) => {
  try{
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body);
  
    await checkUserEmailExists;

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
/* 
   #swagger.summary = '사용자 리뷰 조회 API';
   #swagger.parameters['user_id'] = {
      description: "조회할 사용자의 ID",
      required: true,
      type: "integer",
      in: "path"
   }
   #swagger.responses[200] = {
     description: "사용자 리뷰 조회 성공 응답",
     content: {
       "application/json": {
         schema: {
           type: "array",
           items: {
             type: "object",
             properties: {
              reviews: {
                type: "object",
                properties: {
                  review_id: {type: "integer"},
                  review_content: {type: "string"},
                  reply: {type: "string", nullable: true, example: null},
                  rating: {type: "number", format: "float"},
                  created_at: {type: "string", format: "date"},
                  updated_at: {type: "string", format: "date"},
                  user_nickname: {type: "string"},
                }
              }
              images: {
                type: "object",
                properties: {
                  review_image_id: {type: "integer"},
                  imageUrl: {type: "string"}
                }
              }
              store: {
                type: "object",
                properties: {
                  store_id: {type: "integer"},
                  name: {type: "string"}
                }
              }
            }
          }
        }
      }
    }
  }
}
   #swagger.responses[404] = {
     description: "사용자 리뷰 조회 실패 응답",
     content: {
       "application/json": {
         schema: {
           type: "object",
           properties: {
             resultType: {type: "string", example: "FAIL"},
             error: {
               type: "object",
               properties: {
                 errorCode: {type: "string", example: "U002"},
                 reason: {type: "string"},
                 data: {type: "object"}
               }
             },
             success: {type: "object", nullable: true, example: null}
           }
         }
       }
     }
   }
*/ 
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
/* 
   #swagger.summary = '사용자 미션 조회 API';
   #swagger.parameters['user_id'] = {
      description: "조회할 사용자의 ID",
      required: true,
      type: "integer",
      in: "path"
   }
   #swagger.responses[200] = {
     description: "사용자 리뷰 조회 성공 응답",
     content: {
       "application/json": {
         schema: {
           type: "object",
           properties: {
             user_mission_id: {type: "integer"},
             mission: {
              type: "object",
              properties: {
                mission_content: {type: "string"},
                rewatd_point: {type: "integer"}
              }
            }
            mission_status: {type: "string"},
            start_at: {type: "string", format: "date"},
            completed_at: {type: "string", format: "date"}
           }
         }
       }
     }
   }
  }
}
   #swagger.responses[404] = {
     description: "사용자 미션 조회 실패 응답",
     content: {
       "application/json": {
         schema: {
           type: "object",
           properties: {
             resultType: {type: "string", example: "FAIL"},
             error: {
               type: "object",
               properties: {
                 errorCode: {type: "string", example: "U002"},
                 reason: {type: "string"},
                 data: {type: "object"}
               }
             },
             success: {type: "object", nullable: true, example: null}
           }
         }
       }
     }
   }
*/ 
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
  /* 
   #swagger.summary = '사용자 도전 중 미션 추가 API';
   #swagger.parameters['user_id'] = {
      description: "조회할 사용자의 ID",
      required: true,
      type: "integer",
      in: "path"
   }
   #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            mission_id: {type: "integer"},
            region_id: {type: "integer"} }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "사용자 도전 중 미션 추가 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: {type: "string", example: "SUCCESS"},
              error: {type: "object", nullable: true, example: null},
              success: {
                type: "object",
                properties: {
                  user_mission_id: {type: "integer"},
                  user_id: {type: "integer"},
                  region_id: {type: "integer"},
                  mission_id: {type: "integer"},
                  mission_status: {type: "string"},
                  start_at: {type: "string", format: "date"},
                  completed_at: {type: "string", nullable: true, example: null}}
                }
              }
            }
          }
        }
      }
      #swagger.responses[404] = {
      description: "사용자 도전 중 미션 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: {type: "string", example: "FAIL"},
              error: {
                type: "object",
                properties: {
                  errorCode: {type: "string", example: "U002"},
                  reason: {type: "string"},
                  data: {type: "object"}
                }
              },
              success: {type: "object", nullable: true, example: null}
            }
          }
        }
      }
    }
  */
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
/* 
   #swagger.summary = '사용자 미션 조회 API';
   #swagger.parameters['user_id'] = {
      description: "조회할 사용자의 ID",
      required: true,
      type: "integer",
      in: "path"
   }
  #swagger.parameters['mission_id'] = {
      description: "조회할 미션의 ID",
      required: true,
      type: "integer",
      in: "path"}
  }
   #swagger.responses[200] = {
     description: "사용자 미션 상태 업데이트 성공 응답",
     content: {
       "application/json": {
         schema: {
           type: "object",
           properties: {
             count: {type: "integer"}
          }
        }
      }
    }
  }
   #swagger.responses[404] = {
     description: "사용자 미션 상태 업데이트 실패 응답",
     content: {
       "application/json": {
         schema: {
           type: "object",
           properties: {
             resultType: {type: "string", example: "FAIL"},
             error: {
               type: "object",
               properties: {
                 errorCode: {type: "string", example: "U002"},
                 reason: {type: "string"},
                 data: {type: "object"}
               }
             },
             success: {type: "object", nullable: true, example: null}
           }
         }
       }
     }
   }
*/
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