## 🎯 핵심 키워드

- Swagger
    - 개발한 RestAPI를 편리하게 문서화 해주고, 이를 통해 관리 및 제 3의 사용자가 편리하게 API를 호풀해보고 테스트할 수 있는 프로젝트.
    - <장점>
        1. 개발자가 문서를 작성하지 않아도 되므로 시간 단축 가능.
        2. 쉬운 API 테스트.
        3. API 호풀 시 전달해야 할 파라미터 확인 가능.
        4. API 버전 관리 용이.
        5. 다양한 API 문서 통합 가능.
    - <사용 방법>
        1. YAML 파일 사용 : Swagger UI를 위한 서버를 따로 두고, Swaffer에서 API 요청을 하면 그 요청을 해당 서버로 전달.
        2. 소스코드 내에서 Swagger 설정 : 
            1. `swaggerAutogen`(API 문서 자동 생성)
            2. `swaggerUiExpress`(Swagger UI 제공) 
            
             → 라이브러리이므로 별도 설치 필요.
            
- OpenAPI
    - Web 2.0 API, 통신망 서비스 API 등 주로 인터넷이나 통신망과 관련된 자원의 API를 의미.
    - 여러 사람들이 공동으로 사용할 필요가 있는 자원에 대하여 이 자원의 사용을 개방하고, 사용자들이 자원에 대한 전문적인 지식 없이도 쉽게 사용가능하도록 기능을 추상화하여 표준화한 인터페이스.
    
    <aside>
    🔑
    
    Rest API의 명세를 정의하는 표준화된 방식
    
    </aside>
    
    - <주요 기능>
        1. API 문서 자동 생성 : Swagger UI를 통해 API 엔드포인트, 요청/응답 형식 확인 가능.
        2. 호환성 유지 : API 명세가 표준화되어있으므로 호환성이 높음.
        3. 자동 API 테스트 지원 : Open API 문서를 기반으로 API 요청을 실행하고 응답 검증 가능.
        4. 팀 협업 강화 : 원활한 소통 가능.
    - <사용 방법>
        1. Swagger UI와 함께 사용하여 API 문서를 시각적으로 표현.
        2. Postman에서 OpenAPI JSON 파일을 가져와서 API 테스트.
        3. 코드에서 OpenAPI를 직접 정의하고 자동 문서 생성.
    - 전망 : 아마존, 구글 등 글로벌 회사들이 자사의 서비스를 일반 개발자, 타사 등에 개방하여 다양한 mashup 서비스가 생겨나게 하고, 이렇게 하는 것이 자사의 비즈니스를 더욱 확대하고 수익을 창출하게 되는 계기가 입증, Open API가 보편화되고 있는 추세.
- OpenAPI Component
    - API 문서 내에서 반복되는 데이터 구조를 정의하고 재사용할 수 있도록 함.
    - 같은 구조의 요청/응답이 여러 엔드포인트에서 사용될 경우, 코드 중복을 줄이고 유지 보수를 용이하게 함.
    - <활용 항목>
        1. `schemas` : 데이터 모델 정의 및 재사용.
        2. `responses` : 공통 응답 형식 지정.
        3. `parameters` : 반복되는 URL 파라미터 정의.
        4. `requestBodies` : 공통적인 요청 본문(Request Body) 정의,
        5. `headers` : 반복되는 헤더(Header) 설정.

## 🧩 요약 정리

1. API를 효율적으로 관리하고 원활하게 프론트엔드와 연동하기 위하여 표준화 명세서인 Swagger UI를 사용한다.

## 💪 미션 기록

- 미션 기록
    
    ⇒ URL로 받는 파라미터 정의
    
    ⇒ 요청 body 정리
    
    ⇒ 성공 응답 정리
    
    ⇒ 실패 응답 정리
    
    - reviewimage
        
        `reviewimage.controller.js`에 작성
        
        - 리뷰에 이미지 추가 API
            
            ```jsx
            /* 
               #swagger.summary = '리뷰에 이미지 추가 API';
               #swagger.requestBody = {
                required: true,
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        image_url: {type: "string", format: "uri"},
                        created_at: {type: "string", format: "date"},
                        updated_at: {type: "string", format: "date"} }
                      }
                    }
                  }
                }
                #swagger.responses[200] = {
                  description: "리뷰에 이미지 추가 성공 응답",
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
                              image_url: {type: "string", format: "uri"},
                              created_at: {type: "string", format: "date"},
                              updated_at: {type: "string", format: "date"} }
                            }
                          }
                        }
                      }
                    }
                  }
                  #swagger.responses[400] = {
                  description: "리뷰에 이미지 실패 응답",
                  content: {
                    "application/json": {
                      schema: {
                        type: "object",
                        properties: {
                          resultType: {type: "string", example: "FAIL"},
                          error: {
                            type: "object",
                            properties: {
                              errorCode: {type: "string", example: "R001"},
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
            ```
            
    - store
        
        `store.controller.js` 에 작성
        
        - 지역에 가게 추가 API
            
            ```jsx
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
            ```
            
        - 가게 미션 추가 API
            
            ```jsx
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
            ```
            
        - 가게 리뷰 추가 API
            
            ```jsx
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
            ```
            
        - 가게 미션 조회 API
            
            ```jsx
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
            ```
            
        - 가게 리뷰 조회 API
            
            ```jsx
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
            ```
            
    - user
        
        `user.controller.js` 에 작성
        
        - 사용자 미션 조회 API
            
            ```jsx
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
            ```
            
        - 사용자 리뷰 조회 API
            
            ```jsx
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
            ```
            
        - 사용자 도전 중 미션 추가 API
            
            ```jsx
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
            ```
            
        - 사용자 미션 상태 업데이트 API
            
            ```jsx
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
            ```
            