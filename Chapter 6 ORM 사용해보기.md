## 🎯 핵심 키워드

- ORM
    - Object Relational Mapping
    - 객체와 DB의 테이블을 자동으로 연결시켜 RDB 테이블을 객체 지향적으로 사용하게 하는 기술.
    - 어플리케이션의 객체를 RDB 테이블에 자동으로 영속화.
    - 객체과 관계형 데이터베이스의 데이터를 매핑하는 것.
    - <종류>
        1. `Java` : `Hibernate`
        2. `Python` : `SQLAlchemy`
        3. `Ruby` : `ActiveRecord`
    - <주요 기능>
        1. 객체와 테이블 간 매핑
        2. 데이터 쿼리 및 조작
        3. 트랜잭션 관리
    - <고려해야 할 사항>
        1. 때때로 성능 저하 초래 가능성 : SQL 쿼리가 최적화되지 않았을 경우 발생.
        2. 데이터베이스의 복잡한 쿼리 처리에 대한 한계 : 복잡한 쿼리를 추상화하는 과정에서 세밀한 제어를 제공하지 못할 수 있음.
        3. 객체 모델과 데이터베이스 모델 간의 불일치 문제
        
- Prisma 문서 살펴보기
    - ex. Prisma의 Connection Pool 관리 방법
        - 여러 서버들이 데이터 베이스와 연결을 시도할 경우, 소켓들이 많아지고 부하가 발생함.
        - 데이터 베이스 연결을 미리 생성하고 유지하여 응답 속도를 향상시키는 기법.
        - <관리법>
            1. 환경변수(DATABASE_URL) 설정 시 connection pool의 크기를 지정함.
            
            ```jsx
            DATABASE_URL="mysql://user:password@host:port/database?connection_limit=10"
            ```
            
            1. 환경변수(DATABASE_URL) 설정 시 connection pool의 timeout을 지정함.
            
            ```jsx
            DATABASE_URL="mysql://user:password@host:port/database?connection_limit=15&pool_timeout=15"
            ```
            
            > 따로 설정하지 않은 경우, 물리적 CPU 코어 수 * 2 + 1
            > 
            
            1. `Prisma Client`를 여러 개 생성하지 않고, 하나의 인스턴스를 공유.
            2. 서버 종료 시 Prisma Client 연결 닫기.
            
    - ex. Prisma의 Migration 관리 방법
        - Migration : 데이터베이스의 스키마를 변경하고, 이를 기록하는 과정으로 롤백이 가능함.
        - <관리법>
            1. 각 Migration의 이름을 의미 있게 설정.
            2. `dev`는 로컬 개발 환경, `deploy`는 프로덕션에서 사용
        - <Migration 방법>
            1. 마이그레이션 파일 생성
            
            ```jsx
            npx prisma migrate dev --name update-schema
            ```
            
            > `update schema`는 변경 사항의 이름으로, 변경 내용을 명확히 기록.
            > 
            
            1. 마이그레이션 파일을 기반으로 데이터베이스 스키마 변경
            
            ```jsx
            npx prisma migrate deploy
            ```
            
            1. 마이그레이션 되돌리기
            
            ```jsx
            npx prisma migrate reset
            ```
            
- ORM(Prisma)을 사용하여 좋은 점과 나쁜 점
    - <장점>
        1. 직관적이고 가독성 좋은 코드 : `Query`와 같이 필요한 선언문, 할당 등의 부수적인 코드가 줄어들고, 각종 객체에 대한 코드를 별도로 작성하여 코드의 가독성 증가.
        2. 객체 지향적 접근으로 생산성 증가 : 객체 모델만 활용해서 개발하는 데에 집중 가능, 생산성 증가.
        3. 재사용 및 유지보수의 용이성 증가 : 독립적인 데다 매핑 정보가 명확하여 ERD를 보는 것에 대한 의존도를 낮추고 해당 객체들 재활용이 가능함.
        4. `DBMS`에 대한 종속성 감소 : 특정 DB에 종속적이지 않아 `DBMS`를 교체하는 작업에도 비교적 적은 리스크와 시간이 소요됨.
    - <단점>
        1. 잘못 구현된 경우, 속도 저하 발생.
        2. 복잡한 Query는 QueryDSL 등을 사용해 직접 처리해야 함.
        
- 다양한 ORM 라이브러리 살펴보기
    - ex. Sequelize
        - 자바스크립트 객체와 데이터베이스의 릴레이션을 매핑하는 도구
        - `MySQL`, `MariaDB`, `PostgreSQL`, `SQLite` 등으로의 전환히 비교적 자유로움.
        - SQL 없이 객체 기반으로 데이터베이스를 다룰 수 있어 코드가 깔끔하고 유지보수가 쉬움.
        - <장점>
            1. 모델 관계 정의(1:N, M:N 관계 설정 지원)
            2. 자동 Migration 및 테이블 동기화 기능 지원
            3. 트랜잭션 관리 및 커스텀 쿼리 작성 가능
            
    - ex. TypeORM
        - `Node.js`에서 실행되고 typescript로 작성된 객체 관계형 매퍼라이브러리
        - `MySQL`, `PostgreSQL`, `MariaDB`, `SQLite`, `MS SQL Server`, `ORACLE` 등 여러 데이터베이스 지원.
        - <장점>
            1. 모델을 기반으로 데이터베이스 테이블 체계를 자동으로 생성함.
            2. 데이터베이스에서 개체를 쉽게 삽입 및 삭제 가능.
            3. 테이블 간의 매핑 지원.
            4. 다른 모듈과 쉽게 통합.
            5. 직관적인 코드 작성 가능.
            6. 자동 Migration 및 스키마 동기화.
            
    - ex. Objection.js
        - `Knex.js` 기반의 ORM
        - SQL 쿼리와 객체 모델링을 함께 활용 가능.
        - <장점>
            1. 연결 관계를 명확하게 설정, 복잡한 데이터 구조 관리에 용이.
            2. 강력한 모델링 기능 제공
            3. 1:1, 1:N, M:N 관계를 직관적으로 설정 가능
            4. Raw SQL과 ORM 방식 모두 지원하여 유연한 데이터 조작 가능.
            
    - ex. Mongoose
        - `MongoDB`를 위한 ORM
        - `Node.js`에서 `MongoDB`를 쉽게 다룰 수 있도록 도와주는 도구.
        - `NoSQL` 환경에서 강력한 모델링 기능 제공
        - <장점>
            1. 스키마 기반 데이터 모델링을 지원하여 명확한 데이터 구조 정의 가능.
            2. 강력한 데이터 유효성 검사로 안정적인 데이터 처리.
            3. 미들웨어 기능을 지원하여 데이터 수정, 삭제 등의 로직 확장이 쉬움.
            4. 간결한 코드로 데이터 조회 및 CRUD 작업 가능.
        
- 페이지네이션을 사용하는 다른 API 찾아보기
    - ex. https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28
    - ex. https://developers.notion.com/reference/intro#pagination
    - 프론트엔드 : `Material-UI` 라이브러리 사용

## 🧩 요약 정리

<aside>
💡

이번 주차 워크북을 정리해봅시다! 

이번 주차 워크북이 개념 중심이라면 개념을 정리하고, 실습 중심이라면 1개 이상의 실습 코드 분석 내용을 작성해주세요. (🎯 핵심 키워드에서 이미 정리한 내용은 제외해주셔도 괜찮습니다.)

</aside>

1. prisma ORM을 통해 repository의 함수들을 보다 간결하고 직관적으로 표현할 수 있다.
2. prisma의 migration을 이용하면 schema.prisma 속 model을 토대로 DB를 수정할 수 있다.


## ✅ 실습 체크리스트

1. ORM 사용해보기
2. 목록 API 구현하기

## ☑️ 실습 인증

> 
- ORM 사용해보기 - 회원가입
    
    ![image.png](Chapter%206%20ORM%20%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A2%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5%201e7b57f4596b8047889aed6421458a55/image.png)
    
    ![image.png](Chapter%206%20ORM%20%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A2%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5%201e7b57f4596b8047889aed6421458a55/image%201.png)
    
    → postman에서 body를 입력하고 실행을 하면 DB에 데이터가 잘 삽입되는 걸 볼 수 있다.
    
- 리뷰 목록 API 구현하기
    
    **URL**
    
    <aside>
    🔑
    
    GET http://localhost:3000/api/v1/stores/{store_id}/reviews
    
    </aside>
    
    → 가게별 리뷰를 조회하기 위해 `store_id`를 참조하였다.
    
    ```jsx
    import { listStoreReview } from "../services/getreview.service.js"; 
    import { responseFromReview } from "../dtos/getreview.dto.js";
    
    export const handleListStoreReviews = async (req, res, next) => {
        try {
            console.log("req.params 값:", req.params); 
            const storeId = parseInt(req.params.store_id); 
    
            if (isNaN(storeId)) {
                throw new Error(`storeId가 유효한 숫자가 아닙니다. 입력값: ${req.params.store_id}`);
            }
    
            console.log(`storeId 변환 결과: ${storeId}`);
    
            const cursor = req.query.cursor ? parseInt(req.query.cursor) : 0;
            const reviews = await listStoreReview(storeId, cursor);
    
            res.status(200).json({
                message: "리뷰 목록 조회 성공",
                data: reviews.map(responseFromReview),
            });
        } catch (error) {
            console.error("API 요청 오류:", error);
            res.status(500).json({ message: "리뷰 목록 조회 실패", error: error.message });
        }
    };
    ```
    
    `getreview.controller.js`
    
    ```jsx
    export const responseFromReview = (review) => {
        return {
            reviewId: review.review_id,
            content: review.review_content,
            reply: review.reply ?? null, 
            createdAt: review.created_at,
            updatedAt: review.updated_at,
            user: {
                userId: review.user.user_id,
                nickname: review.user.nickname, 
            },
            store: {
                storeId: review.store.store_id,
                name: review.store.store_name, 
            },
        };
    };
    ```
    
    `getreview.dto.js`
    
    ```jsx
    import { getAllStoreReviews } from "../repositories/getreview.repository.js";
    
    export const listStoreReview = async (storeId, cursor) => {
        try {
            return await getAllStoreReviews(storeId, cursor);
        } catch (error) {
            console.error("리뷰 조회 서비스 오류:", error);
            throw new Error("리뷰 조회 서비스에서 문제가 발생했습니다.");
        }
    };
    ```
    
    `getreview.service.js`
    
    ```jsx
    import { prisma } from "../db.config.js"; 
    
    export const getAllStoreReviews = async (storeId, cursor = 0) => {
        try {
            const reviews = await prisma.review.findMany({
                select: {
                    review_id: true,
                    review_content: true,
                    reply: true,
                    created_at: true,
                    updated_at: true,
                    user: {
                        select: {
                            user_id: true,
                            nickname: true,
                        },
                    },
                    store: {
                        select: {
                            store_id: true,
                            store_name: true,
                        },
                    },
                },
                where: {
                    store_id: storeId,
                    review_id: { gt: cursor },
                },
                orderBy: { review_id: "asc" },
                take: 5,
            });
    
            console.log(`${storeId}의 리뷰 목록 조회 완료 (cursor: ${cursor})`);
            return reviews;
        } catch (error) {
            console.error("리뷰 목록 조회 중 오류 발생:", error);
            throw new Error("리뷰 목록을 가져오는 중 문제가 발생했습니다.");
        }
    };
    ```
    
    `getreview.repository.js` 
    
    <img width="1021" alt="가게 리뷰 조회" src="https://github.com/user-attachments/assets/be81e7e4-1de1-4854-9ac1-634937517f25" />

    
    > postman 테스트 화면
    > 

    

## 💪 미션 기록

- 미션 기록
    
- 미션 기록
    - 0. 기존에 구현했던 repository의 함수들을 prisma ORM으로 바꾸기
        
        
        **회원 가입하기**
        
        ```python
        import { prisma } from "../db.config.js";
        
        // 이메일로 사용자 조회
        export const findUserByEmail = async (email) => {
          return await prisma.user.findUnique({
            where: { email },
          });
        };
        
        // 사용자 추가 (중복 이메일 방지)
        export const addUser = async (data) => {
          const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
          });
        
          if (existingUser) {
            return null; // 이미 존재하는 이메일
          }
        
          const createdUser = await prisma.user.create({ data });
          return createdUser.id;
        };
        
        // 사용자 정보 조회
        export const getUser = async (userId) => {
          return await prisma.user.findUniqueOrThrow({
            where: { id: userId },
          });
        };
        
        // 사용자 선호 설정
        export const setPreference = async (userId, preferenceId) => {
          await prisma.userPreference.create({
            data: {
              userId,
              preferenceId,
            },
          });
        };
        
        // 특정 사용자 선호도 조회
        export const getUserPreferencesByUserId = async (userId) => {
          return await prisma.userPreference.findMany({
            select: {
              id: true,
              userId: true,
              preferenceId: true,
              preference: true,
            },
            where: { userId },
            orderBy: { preferenceId: "asc" },
          });
        };
        ```
        
        `user.repository.js`
        
        **미션 추가하기**
        
        ```jsx
        import { prisma } from "../db.config.js"; // Prisma ORM 사용
        
        // 가게 조회 (storeId 기반 조회)
        export const findStoreByIdRepository = async (storeId) => {
          return await prisma.store.findUnique({
            where: { store_id: storeId }, // `findUnique()`로 데이터 조회
          });
        };
        
        // 미션 추가 (store_id → region_id 가져온 후 미션 생성)
        export const addMissionRepository = async (storeId, missionData) => {
          // `Store`에서 `region_id` 가져오기
          const store = await prisma.store.findUnique({
            where: { store_id: storeId },
            select: { region_id: true }, // `region_id`만 선택적으로 조회
          });
        
          if (!store) {
            throw new Error(`Store ID ${storeId} not found.`);
          }
        
          // `region_id` 포함하여 미션 데이터 삽입
          const createdMission = await prisma.mission.create({
            data: {
              store_id: storeId,
              region_id: store.region_id,
              mission_content: missionData.mission_content,
              reward_point: missionData.reward_point,
              created_at: new Date(),
              updated_at: new Date(),
            },
          });
        
          return createdMission;
        };
        ```
        
        `mission.repository.js`
        
        **리뷰 추가하기**
        
        ```jsx
        import { prisma } from "../db.config.js"; 
        
        // 가게 조회 (storeId 기반 조회)
        export const findStoreByIdRepository = async (storeId) => {
          return await prisma.store.findUnique({
            where: { store_id: storeId },
          });
        };
        
        // 사용자 조회 (userId 기반 조회)
        export const findUserByIdRepository = async (userId) => {
          return await prisma.user.findUnique({
            where: { user_id: userId }, 
          });
        };
        
        // 리뷰 추가
        export const addReviewRepository = async (storeId, userId, reviewData) => {
          const createdReview = await prisma.review.create({
            data: {
              store_id: storeId,
              user_id: userId,
              rating: reviewData.rating,
              review_content: reviewData.review_content,
              created_at: new Date(),
              updated_at: new Date(),
            },
          });
        
          console.log("리뷰 저장 완료!", createdReview.review_id);
        
          return createdReview;
        };
        ```
        
        `review.repository.js`
        
        **리뷰에 이미지 추가하기**
        
        ```jsx
        import { prisma } from "../db.config.js";
        
        // 리뷰 조회 (reviewId 기반 조회)
        export const findReviewByIdRepository = async (reviewId) => {
          return await prisma.review.findUnique({
            where: { review_id: reviewId },
            select: {
              review_id: true,
              rating: true,
              review_content: true,
            },
          });
        };
        
        // 리뷰 이미지 추가
        export const addReviewImageRepository = async (review, reviewImageData) => {
          const { review_id, rating, review_content } = review;
        
          console.log("🔹 addReviewImageRepository - review_id:", review_id);
        
          const createdReviewImage = await prisma.reviewImage.create({
            data: {
              review_id,
              image_url: reviewImageData.image_url,
              created_at: new Date(),
              updated_at: new Date(),
            },
          });
        
          console.log("리뷰 이미지 저장 완료!", createdReviewImage.review_image_id);
        
          return {
            review_image_id: createdReviewImage.review_image_id,
            review_id,
            rating,
            review_content,
            ...reviewImageData,
            created_at: new Date(),
            updated_at: new Date(),
          };
        };
        ```
        
        `reviewimage.repository.js`
        
        **가게 정보 추가하기**
        
        ```jsx
        import { prisma } from "../db.config.js";
        
        export const addStoreToDB = async (storeData) => {
          try {
            // region_id 검증
            const regionId = Number(storeData.regionId);
            if (!regionId) {
              throw new Error("regionId가 올바르게 전달되지 않았습니다.");
            }
        
            // store_name 검증
            if (!storeData.storeName) {
              throw new Error("storeName이 올바르게 전달되지 않았습니다.");
            }
        
            // Region 테이블에서 해당 region_id가 존재하는지 확인
            const regionExists = await prisma.region.findUnique({
              where: { region_id: regionId },
            });
        
            if (!regionExists) {
              throw new Error(`region_id ${regionId}가 region 테이블에 존재하지 않습니다.`);
            }
        
            console.log("region_id 존재 확인 완료");
        
            // 가게 정보 삽입
            const createdStore = await prisma.store.create({
              data: {
                region_id: regionId,
                store_name: storeData.storeName,
                store_image_url: storeData.storeImageUrl,
                opening_hours: storeData.openingHours,
                open_status: storeData.openStatus,
                location: storeData.location,
                cuisine: storeData.cuisine,
                average_rating: storeData.averageRating,
                created_at: new Date(),
                updated_at: new Date(),
              },
            });
        
            console.log("가게 정보 저장 완료!");
        
            // 삽입된 가게 정보 반환
            return createdStore;
          } catch (error) {
            console.error("DB 저장 중 오류 발생:", error);
            throw new Error(`가게 정보 저장 실패: ${error.message}`);
          }
        };
        ```
        
        `store.repositoy.js`
        
        **도전 중인 사용자 미션 조회 및 새로운 도전 중 추가하기**
        
        ```jsx
        import { prisma } from "../db.config.js";
        
        //특정 사용자의 진행 중인 미션 조회
        export const findUserMissionsRepository = async (userId) => {
          return await prisma.userMission.findMany({
            where: {
              user_id: userId,
              mission_status: "in_progress",
            },
            select: {
              user_mission_id: true,
              mission: {
                select: {
                  mission_content: true,
                  reward_point: true,
                },
              },
              mission_status: true,
              start_at: true,
              completed_at: true,
            },
          });
        };
        
        //새로운 미션을 `in_progress` 상태로 추가
        export const addUserMissionRepository = async (userMissionData) => {
          const createdMission = await prisma.userMission.create({
            data: {
              mission_id: userMissionData.mission_id,
              user_id: userMissionData.user_id,
              region_id: userMissionData.region_id,
              mission_status: userMissionData.mission_status,
              start_at: userMissionData.start_at,
              completed_at: userMissionData.completed_at,
            },
          });
        
          console.log("새로운 미션 추가 완료", createdMission.user_mission_id);
        
          return createdMission;
        };
        ```
        
        `usermission.repository.js`
        
    - 1. 내가 작성한 리뷰 목록
        
        특정 사용자가 작성한 리뷰를 조회하기 위해 `getuserreview.controller.js` , `getuserreview.dto.js` , `getuserreview.service.js` , `getuserreview.repository.js`  파일을 만들어 진행하였다.
        
        **API URL**
        
        <aside>
        🔑
        
        GET /api/v1/review/{user_id}/own
        
        </aside>
        
        > 사용자별로 미션을 조회하기 때문에 `user_id`를 참조하였다.
        > 
        
        > 사용자 본인이 쓴 리뷰를 조회하는 것이기 때문에 URL에 own을 넣어 알아보기 쉽게 하였다.
        > 
        
        → 조건 : 제시된 참고화면을 보면 특정 사용자가 작성한 리뷰 화면에서 `닉네임`, `작성날짜`, `별점`, `사진`, `내용`, `사장님 답글`의 요소가 보여야한다.
        
        → 커서 페이지네이션으로 구현하였다.
        
        **Controller**
        
        ```python
        import { listUserReviewsService } from "../services/getuserreview.service.js";
        
        export const handleListUserReviews = async (req, res, next) => {
            try {
                const userId = parseInt(req.params.user_id);
                const cursor = req.query.cursor ? parseInt(req.query.cursor) : 0;
        
                if (isNaN(userId)) {
                    throw new Error("userId가 올바르지 않습니다.");
                }
        
                console.log(`userId: ${userId}, cursor: ${cursor}`); // 값이 올바르게 들어왔는지 확인
        
                const reviews = await listUserReviewsService(userId, cursor);
        
                res.status(200).json({
                    message: "내가 작성한 리뷰 목록 조회 성공",
                    data: reviews,
                });
            } catch (error) {
                console.error("리뷰 목록 조회 오류:", error);
                res.status(500).json({ message: "리뷰 목록 조회 실패", error: error.message });
            }
        };
        ```
        
        **Dto**
        
        ```python
        export const responseFromReview = (review) => {
            return {
                reviewId: review.review_id,
                reviewContent: review.review_content,
                reply: review.reply ?? null, 
                rating: review.rating,
                createdAt: review.created_at,
                updatedAt: review.updated_at,
                userNickname: review.user.nickname,
                images: review.reviewimages.map(image => ({
                    reviewImageId: image.reviewimage_id,
                    imageUrl: image.image_url,
                })),
                store: {
                    storeId: review.store.store_id,
                    name: review.store.store_name,
                },
            };
        };
        ```
        
        → 리뷰 내용, 사장님 답글, 별점, 작성 날짜, 닉네임, 사진, 가게가 조회되도록 설정했다.
        
        **Service**
        
        ```python
        import { findUserReviewsRepository } from "../repositories/getuserreview.repository.js";
        import { responseFromReview } from "../dtos/getuserreview.dto.js";
        
        export const listUserReviewsService = async (userId, cursor) => {
            try {
                const reviews = await findUserReviewsRepository(userId, cursor);
                return reviews.reviews.map(responseFromReview);
            } catch (error) {
                console.error("리뷰 조회 서비스 오류:", error);
                throw new Error("리뷰 조회 서비스에서 문제가 발생했습니다.");
            }
        };
        ```
        
        **Repository**
        
        ```python
        import { prisma } from "../db.config.js";
        
        export const findUserReviewsRepository = async (userId, cursor = 0) => {
            try {
                const reviews = await prisma.review.findMany({
                    where: {
                        user_id: userId,
                        review_id: { gt: cursor },
                    },
                    select: {
                        review_id: true,
                        review_content: true,
                        reply: true,
                        rating: true,
                        created_at: true,
                        updated_at: true,
                        reviewimages: {
                            select: {
                                reviewimage_id: true,
                                image_url: true,
                            },
                        },
                        store: {
                            select: {
                                store_id: true,
                                store_name: true,
                            },
                        },
                        user: { 
                            select: {
                                nickname: true,
                            },
                        },
                    },
                    orderBy: { review_id: "asc" },
                    take: 5,
                });
        
                // 다음 커서 값 설정 (마지막 리뷰 ID)
                const nextCursor = reviews.length > 0 ? reviews[reviews.length - 1].review_id : null;
        
                return { reviews, nextCursor };
            } catch (error) {
                console.error("리뷰 목록 조회 중 오류 발생:", error);
                throw new Error("리뷰 목록을 가져오는 중 문제가 발생했습니다.");
            }
        };
        ```
        
        → 리뷰 내용, 사장님 답글, 별점, 작성 날짜, 닉네임, 사진, 가게가 조회되도록 설정했다.
        
        <img width="1034" alt="사용자 리뷰 조회" src="https://github.com/user-attachments/assets/e0e73d77-51ab-45c3-8f72-2d63d1c3de59" />

        
        > postman 테스트 화면
        > 
        
    - 2. 특정 가게 미션 목록
        
        특정 가게의 미션을 조회하기 위해 `getmission.controller.js` , `getmission.dto.js` , `getmission.service.js` , `getmission.repository.js` 파일을 만들어 진행하였다.
        
        **API URL**
        
        <aside>
        🔑
        
        GET http://localhost:3000/api/v1/stores/{store_id}/missions
        
        </aside>
        
        > 특정 가게의 미션을 조회하기 위해 `store_id`를 참조하였다.
        > 
        
        → 커서 페이지네이션을 포함해 구현하였다.
        
        → 실습 때 구현한 가게 별 리뷰 목록 조회 코드를 변형하였다.
        
        **Controller**
        
        ```python
        import { listStoreMission } from "../services/getmission.service.js"; 
        import { responseFromMission } from "../dtos/getmission.dto.js";
        
        export const handleListMissions = async (req, res, next) => {
            try {
                console.log("req.params 값:", req.params); 
                const storeId = parseInt(req.params.store_id); 
        
                if (isNaN(storeId)) {
                    throw new Error(`storeId가 유효한 숫자가 아닙니다. 입력값: ${req.params.store_id}`);
                }
        
                console.log(`storeId 변환 결과: ${storeId}`);
        
                const cursor = req.query.cursor ? parseInt(req.query.cursor) : 0;
                const reviews = await listStoreMission(storeId, cursor);
        
                res.status(200).json({
                    message: "미션 목록 조회 성공",
                    data: reviews.map(responseFromMission),
                });
            } catch (error) {
                console.error("API 요청 오류:", error);
                res.status(500).json({ message: "미션 목록 조회 실패", error: error.message });
            }
        };
        ```
        
        **Dto**
        
        ```python
        export const responseFromMission = (mission) => {
            return {
                missionId: mission.mission_id,
                content: mission.mission_content, 
                rewardPoint: mission.reward_point,
                createdAt: mission.created_at,
                updatedAt: mission.updated_at,
                store: mission.store ? { 
                    storeId: mission.store.store_id,
                    name: mission.store.store_name, 
                } : null,
                region: mission.region ? { 
                    regionId: mission.region.region_id,
                    regionName: mission.region.region_name,
                } : null,
            };
        };
        ```
        
        **Service**
        
        ```python
        import { getAllStoreMissions } from "../repositories/getmission.repository.js";
        
        export const listStoreMission = async (storeId, cursor) => {
            try {
                return await getAllStoreMissions(storeId, cursor);
            } catch (error) {
                console.error("미션 조회 서비스 오류:", error);
                throw new Error("미션 조회 서비스에서 문제가 발생했습니다.");
            }
        };
        ```
        
        **Repository**
        
        ```python
        import { prisma } from "../db.config.js"; 
        
        export const getAllStoreMissions = async (storeId, cursor = 0) => {
            try {
                const missions = await prisma.mission.findMany({
                    select: {
                        mission_id: true,
                        mission_content: true,
                        reward_point: true,
                        created_at: true,
                        updated_at: true,
                        store: {
                            select: {
                                store_id: true,
                                store_name: true,
                            },
                        },
                        region: {
                            select: {
                                region_id: true,
                                region_name: true,
                            }
                        }
                    },
                    where: {
                        store_id: storeId, 
                        mission_id: { gt: cursor },
                    },
                    orderBy: { mission_id: "asc" },
                    take: 5,
                });
        
                console.log(`${storeId}의 미션 목록 조회 완료 (cursor: ${cursor})`);
                return missions;
            } catch (error) {
                console.error("미션 목록 조회 중 오류 발생:", error);
                throw new Error("미션 목록을 가져오는 중 문제가 발생했습니다.");
            }
        };
        ```
        
        <img width="1026" alt="가게 미션 조회" src="https://github.com/user-attachments/assets/720b9b96-8c2b-47f8-8688-b526321b0f99" />

        
        > postman 테스트 화면
        > 
        
    - 3. 내가 진행 중인 미션 목록
        
        지난 주에 구현했던 진행 중 미션 목록 조회 API를 변형하여  커서 페이지네이션을 추가하였다.
        
        이 때, 미션 조회의 기본 값 = “`in_progress`”로 설정하였다.
        
        **API URL**
        
        <aside>
        🔑
        
        GET /api/v1/user/{user_id}/missions
        
        </aside>
        
        > 사용자별로 미션을 조회하기 때문에 `user_id`를 참조하였다.
        > 
        
        **Controller**
        
        ```jsx
        import { StatusCodes } from "http-status-codes";
        import { getUserMissionsService } from "../services/usermission.service.js";
        
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
        ```
        
        `usermission.controller.js`
        
        **DTO**
        
        ```jsx
        export const createUserMissionDTO = (data, user_id) => {
            if (!data.mission_id || !data.region_id) {
              throw new Error("Missing required fields: mission_id, region_id");
            }
          
            return {
              mission_id: Number(data.mission_id),
              user_id, // URL에서 받은 user_id 적용
              region_id: Number(data.region_id),
              mission_status: "in_progress", // 기본값 설정
              start_at: new Date(), // 현재 시간으로 설정
              completed_at: null, // 아직 완료되지 않음
            };
          };
        ```
        
        `usermission.dto.js`
        
        **Service**
        
        ```jsx
        import { prisma } from "../db.config.js";
        
        import { findUserMissionsRepository } from "../repositories/usermission.repository.js";
        
        export const getUserMissionsService = async (userId, cursor, limit) => {
          const userMissions = await findUserMissionsRepository(userId, cursor, limit);
        
          if (!userMissions.length) {
            throw new Error(`No ongoing missions found for user ID ${userId}.`);
          }
        
          // 마지막 커서 반환
          const lastCursor = userMissions.length > 0 ? userMissions[userMissions.length - 1].user_mission_id : null;
        
          return {
            missions: userMissions,
            nextCursor: lastCursor, // 다음 페이지의 커서 값 반환
          };
        };
        ```
        
        `usermission.service.js`
        
        **Repository**
        
        ```jsx
        import { prisma } from "../db.config.js";
        
        //특정 사용자의 진행 중인 미션 조회
        export const findUserMissionsRepository = async (userId) => {
          return await prisma.userMission.findMany({
            where: {
              user_id: userId,
              mission_status: "in_progress",
            },
            select: {
              user_mission_id: true,
              mission: {
                select: {
                  mission_content: true,
                  reward_point: true,
                },
              },
              mission_status: true,
              start_at: true,
              completed_at: true,
            },
          });
        };
        ```
        
        `usermission.repository.js`
        
        <img width="1058" alt="사용자 미션 조회" src="https://github.com/user-attachments/assets/77a5f14e-6fd0-428a-80f0-7b8deac559e6" />

        
        > postman 테스트 화면
        > 
        
    - 4. 내가 진행 중인 미션을 진행 완료로 바꾸기
        
        사용자의 진행 중 미션을 미션 완료로 바꾸기 위해 기존에 존재하던 `usermission.controller.js` , `usermission.dto.js` , `usermission.service.js` , `usermission.repository.js` 파일에 함수를 추가하였다.
        
        → `User_mission` 테이블의 `usermission_status` 컬럼의 값을 `“in_progress”` 에서 `“completed”`로 변경.
        
        **API URL**
        
        <aside>
        🔑
        
        PUT /api/v1/update/{user_id}/{mission_id}/user-mission
        
        </aside>
        
        > 특정 사용자의 특정 미션의 상태를 업데이트하는 것이므로 `user_id` , `mission_id`를 참조, 메소드는 PUT을 사용하였다.
        > 
        
        **Controller**
        
        ```python
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
        ```
        
        `usermission.controller.js`
        
        **Dto**
        
        → 추가 항목이 없다.
        
        **Service**
        
        ```python
        // 미션 완료 상태 업데이트
        export const completeUserMissionService = async (userId, missionId) => {
          const updatedMission = await updateUserMissionStatusRepository(userId, missionId);
        
          if (!updatedMission) {
            throw new Error(`Mission ${missionId} for User ${userId} not found or not in progress.`);
          }
        
          return updatedMission;
        };
        ```
        
        `usermission.service.js`
        
        **Repository**
        
        ```python
        // 미션 완료 상태 업데이트
        export const updateUserMissionStatusRepository = async (userId, missionId) => {
          return await prisma.userMission.updateMany({
            where: {
              user_id: userId,
              mission_id: missionId,
              mission_status: "in_progress",
            },
            data: {
              mission_status: "completed",
              completed_at: new Date(), 
            },
          });
        };
        ```
        
        `usermission.repository.js`
        
        <img width="1031" alt="사용자 미션 업데이트" src="https://github.com/user-attachments/assets/67eaa5f0-cd92-4d5e-9405-7cce7cf86be8" />

        
        > postman 테스트 화면
        > 
        

## ⚡ 트러블 슈팅

- ⚡ 이슈 No. 1
    
    **`이슈`**
    
    👉 회원가입 API를 prisma ORM으로 변환하는 도중, `inactive_date`를 `schema.prisma`에 model로 선언했음에도 불구, 찾지 못하는 오류 발생
    
    ![image](https://github.com/user-attachments/assets/4a12c56b-accb-4ee7-8273-3f309a63fd7c)

    
    **`문제`**
    
    👉 DB의 user 테이블 컬럼명에 오타가 있었다.
    
    **`해결`**
    
    👉  오타를 수정하였다.
    
- ⚡ 이슈 No. 2
    
    **`이슈`**
    
    👉 
    
    <img width="753" alt="회원가입 오류" src="https://github.com/user-attachments/assets/0b9c0224-a471-4c1d-a7fb-d5db77418373" />

    
    → DB에 존재하지 않는 이메일을 입력하였음에도 불구, 데이터는 잘 삽입되지만 이메일이 이미 존재한다는 오류 메세지가 출력된다.
    
    **`문제`**
    
    👉 해결하지 못하였다.
    
    **`해결`**
    
    👉 
    
    **`참고 레퍼런스`**
    
    - 
