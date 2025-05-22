import { StatusCodes } from "http-status-codes";
import { 
  bodyToStore,
  responseFromMission,
  responseFromReview,
  createMissionDTO,
  createReviewDTO,
 } from "../dtos/store.dto.js";

import { 
  addStore, 
  checkRegionExists,
  listStoreMission,
  checkStoreExists,
  listStoreReview,
  addMissionService,
  addReviewService,
  checkUserExists
 } from "../services/store.service.js";

// 지역에 가게 추가
export const handleStoreCreation = async (req, res, next) => {
  /* 
   #swagger.summary = '지역에 가게 추가 API';
   #swagger.parameters['region_id'] = {
      description: "조회할 지역의 ID",
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
            store_name: {type: "string"},
            store_image_url: {type: "string", format: "uri"},
            opening_hours: {type: "string"},
            open_status: {type: "string"},
            location: {type: "string"},
            cuisine: {type: "string"},
            average_rating: {type: "number", format: "float"} }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "지역에 가게 추가 성공 응답",
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
                  location: {type: "string"},
                  cuisine: {type: "string"} }
                }
              }
            }
          }
        }
      }
      #swagger.responses[404] = {
      description: "지역에 가게 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: {type: "string", example: "FAIL"},
              error: {
                type: "object",
                properties: {
                  errorCode: {type: "string", example: "RE001"},
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
    const regionId = parseInt(req.params.region_id);

    if (isNaN(regionId)) {
      return next(new Error(`regionId가 유효한 숫자가 아닙니다. 입력값: ${req.params.region_id}`));
    }
    console.log("받은 regionId:", regionId);

    await checkRegionExists(regionId);

    const storeData = bodyToStore(req.body, regionId); // DTO 변환
    const newStore = await addStore(storeData);

    res.status(StatusCodes.OK).success({
      resultType: "SUCCESS",
      message: null,
      data: newStore,
    });

  } catch (error) {
    console.error("API 요청 오류:", error);
    return next(error);
  }
};

// 가게 미션 조회
export const handleListMissions = async (req, res, next) => {
  /* 
   #swagger.summary = '가게의 미션 목록 조회 API';
   #swagger.parameters['store_id'] = {
      description: "조회할 가게의 ID",
      required: true,
      type: "integer",
      in: "path"
   }
   #swagger.responses[200] = {
     description: "가게의 미션 조회 성공 응답",
     content: {
       "application/json": {
         schema: {
           type: "array",
           items: {
             type: "object",
             properties: {
               mission_id: {type: "integer"},
               mission_content: {type: "string"},
               reward_point: {type: "integer"},
               created_at: {type: "string", format: "date"},
               updated_at: {type: "string", format: "date"},
               store: {
                 type: "object",
                 properties: {
                   store_id: {type: "integer"},
                   store_name: {type: "string"}
                 }
               },
               region: {
                 type: "object",
                 properties: {
                   region_id: {type: "integer"},
                   region_name: {type: "string"}
                 }
               }
             }
           }
         }
       }
     }
   }
   #swagger.responses[404] = {
     description: "가게 미션 조회 실패 응답",
     content: {
       "application/json": {
         schema: {
           type: "object",
           properties: {
             resultType: {type: "string", example: "FAIL"},
             error: {
               type: "object",
               properties: {
                 errorCode: {type: "string", example: "M001"},
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
        const storeId = parseInt(req.params.store_id); 

        if (isNaN(storeId)) {
            throw new Error("storeId가 유효한 값이 아닙니다.", { store_id });
        }
        
        await checkStoreExists(storeId);

        const cursor = req.query.cursor ? parseInt(req.query.cursor) : 0;
        const missionData = responseFromMission(req.body); // DTO 변환
        const missions = await listStoreMission(storeId, cursor, missionData);


        res.status(StatusCodes.OK).success ({
            resultType : "SUCCESS",
            message: null,
            data: missions,
        });

    } catch (error) {
        return next(error);
    }
};

// 가게에 미션 추가
export const createMission = async (req, res, next) => {
  /* 
   #swagger.summary = '가게에 미션 추가 API';
   #swagger.parameters['store_id'] = {
      description: "조회할 가게의 ID",
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
            mission_content: {type: "string"},
            reward_point: {type: "integer"} }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "가게에 미션 추가 성공 응답",
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
                  mission_content: {type: "string"},
                  store_id: {type: "integer"},
                  region_id: {type: "integer"},
                  reward_point: {type: "integer"},
                  created_at: {type: "string", format: "date"},
                  updeated_at: {type: "string", format: "date"} }
                }
              }
            }
          }
        }
      }
      #swagger.responses[400] = {
      description: "가게에 미션 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: {type: "string", example: "FAIL"},
              error: {
                type: "object",
                properties: {
                  errorCode: {type: "string", example: "S001"},
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
      const storeId = parseInt(req.params.store_id);

      if (isNaN(storeId)) {
          return next(new Error(`storeId가 유효한 숫자가 아닙니다. ${req.params.store_id}`));
      }

      await checkStoreExists(storeId);

      const missionData = createMissionDTO(req.body); // DTO 변환
      const newMission = await addMissionService(storeId, missionData);

     res.status(StatusCodes.OK).success ({
        resultType: "SUCCESS",
        message: null,
        data: newMission,
     });
  } catch (error) {
      return next(error);
  }
};

// 가게 리뷰 조회
export const handleListStoreReviews = async (req, res, next) => {
  /* 
   #swagger.summary = '가게의 리뷰 목록 조회 API';
   #swagger.parameters['store_id'] = {
      description: "조회할 가게의 ID",
      required: true,
      type: "integer",
      in: "path"
   }
   #swagger.responses[200] = {
     description: "가게의 리뷰 조회 성공 응답",
     content: {
       "application/json": {
         schema: {
           type: "array",
           items: {
             type: "object",
             properties: {
               content: {type: "string"},
               reply: {type: "string", nullable: true, example: null},
               created_at: {type: "string", format: "date"},
               updated_at: {type: "string", format: "date"},
               user: {
                type: "object",
                properties: {
                  user_id: {type: "integer"},
                  nickname: {type: "string"}
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
     description: "가게 리뷰 조회 실패 응답",
     content: {
       "application/json": {
         schema: {
           type: "object",
           properties: {
             resultType: {type: "string", example: "FAIL"},
             error: {
               type: "object",
               properties: {
                 errorCode: {type: "string", example: "S001"},
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
      const storeId = parseInt(req.params.store_id);
  
      if (isNaN(storeId)) {
        throw new Error(`storeId가 유효한 숫자가 아닙니다. ${req.params.store_id}`);
      }
  
      await checkStoreExists(storeId);
  
      const cursor = req.query.cursor ? parseInt(req.query.cursor) : 0;
      const reviews = await listStoreReview(storeId, cursor);
      const formattedReviews = reviews.map(responseFromReview); // DTO 변환
  
      res.status(StatusCodes.OK).success({
        resultType: "SUCCESS",
        message: null,
        data: formattedReviews,
      });
  
    } catch (error) {
      return next(error);
    }
  };  
  
  // 가게에 리뷰 추가
  export const addReview = async (req, res, next) => {
    /* 
   #swagger.summary = '가게에 리뷰 추가 API';
   #swagger.parameters['store_id'] = {
      description: "조회할 가게의 ID",
      required: true,
      type: "integer",
      in: "path"
   }
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
            rating: {type: "number", format: "float"},
            review_content: {type: "string"} }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "가게에 리뷰 추가 성공 응답",
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
                  review_id: {type: "integer"},
                  store_id: {type: "integer"},
                  user_id: {type: "integer"},
                  review_content: {type: "string"},
                  reply: {type: "string", nullable: true, example: null},
                  created_at: {type: "string", format: "date"},
                  updated_at: {type: "string", format: "date"},
                  rating: {type: "number", format: "float"} }
                }
              }
            }
          }
        }
      }
      #swagger.responses[404] = {
      description: "가게에 리뷰 추가 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: {type: "string", example: "FAIL"},
              error: {
                type: "object",
                properties: {
                  errorCode: {type: "string", example: "S001"},
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
      const storeId = parseInt(req.params.store_id); 
      const userId = parseInt(req.params.user_id); 
  
      if (isNaN(storeId)) {
        return next(new Error(`storeId가 유효한 숫자가 아닙니다. ${req.params.store_id}`));
      }
      if (isNaN(userId)) {
        return next(new Error(`userId가 유효한 숫자가 아닙니다. ${req.params.user_id}`));
      }
  
      const reviewData = createReviewDTO(req.body); // DTO 변환
  
      await checkStoreExists(storeId);
      await checkUserExists(userId);

      const newReview = await addReviewService(storeId, userId, reviewData);
  
      res.status(StatusCodes.OK).success({
        resultType: "SUCCESS",
        message: null,
        success: newReview
      });
  
    } catch (error) {
      console.error("API 요청 오류", error);
      return next(error);
    }
  };