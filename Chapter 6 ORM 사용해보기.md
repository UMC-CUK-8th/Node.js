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
- ORM 사용해보기 - 회원가입
    
    ![image.png](Chapter%206%20ORM%20%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A2%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5%201e7b57f4596b8047889aed6421458a55/image.png)
    
    > `schema.prisma`의 model에 `inactive_date`를 명시하였는데도 찾지 못한다는 오류가 발생함.
    > 
    
- 리뷰 목록 API 구현하기
    
    ```jsx
    export const handleListStoreReivews = async (req, res, next) => {
        const reviews = await listStoreReview (
            parseInt(req.params.storeId),
            typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
        );
        res.status(StatusCodes.OK).success(reviews);
    };
    ```
    
    `getreview.controller.js`
    
    ```jsx
    export const responseFromReviews = (reviews) => {
        return {
            data: reviews,
            pagination: {
                cursor: reviews.length ? reviews[reviews.length - 1].id : null,
            },
        };
    };
    ```
    
    `getreview.dto.js`
    
    ```jsx
    import { responseFromReviews } from "../dtos/getreview.dto.js";
    
    export const listStoreReview = async (storeId) => {
        const reviews = await getAllStoreReviews(storeId);
        return responseFromRevies(reviews);
    };
    ```
    
    `getreview.service.js`
    
    ```jsx
    import {prisma} from "../db.config.js";
    
    export const getAllStoreReviews = async (storeId) => {
        const reviews = await prisma.userStoreReview.findMany({
            select: {
                reviewId: true,
                content: true,
                storeId: true,
                userId: true,
                storeId: true,
                userId: true,
            },
            where: {storeId: storeId, reviewId: {gt: cursor}},
            orderBy: {reviewId: "asc"},
            take: 5,
        });
        
        return reviews;
    };
    ```
    
    `getreview.repository.js` 
    

## 💪 미션 기록

- 미션 기록
    - 0. 기존에 구현했던 repository의 함수들을 prisma ORM으로 바꾸기
        
        
        **미션 추가하기**
        
        ```jsx
        import { prisma } from "../prismaClient.js";
        
        // 특정 Store 조회
        export const findStoreByIdRepository = async (storeId) => {
          const store = await prisma.store.findUnique({
            where: { store_id: storeId },
          });
        
          return store || null; // 가게 존재 여부 검증
        };
        
        // Mission 추가
        export const addMissionRepository = async (storeId, missionData) => {
          // `Store` 테이블에서 `region_id` 가져오기
          const store = await prisma.store.findUnique({
            where: { store_id: storeId },
            select: { region_id: true },
          });
        
          if (!store) {
            throw new Error(`Store ID ${storeId} not found.`);
          }
        
          // `region_id`를 포함하여 `Mission` 데이터 삽입
          const mission = await prisma.mission.create({
            data: {
              store_id: storeId,
              region_id: store.region_id,
              mission_content: missionData.mission_content,
              reward_point: missionData.reward_point,
            },
          });
        
          return mission;
        };
        ```
        
        `mission.repository.js`
        
        **리뷰 추가하기**
        
        ```jsx
        import { prisma } from "../prismaClient.js";
        
        // 특정 Store 조회
        export const findStoreByIdRepository = async (storeId) => {
          return await prisma.store.findUnique({
            where: { store_id: storeId },
          });
        };
        
        // 특정 User 조회
        export const findUserByIdRepository = async (userId) => {
          return await prisma.user.findUnique({
            where: { user_id: userId },
          });
        };
        
        // 리뷰 추가
        export const addReviewRepository = async (storeId, userId, reviewData) => {
          const review = await prisma.review.create({
            data: {
              store_id: storeId,
              user_id: userId,
              rating: reviewData.rating,
              review_content: reviewData.review_content,
            },
          });
        
          console.log("리뷰 저장 완료!", review.review_id);
        
          return review;
        };
        
        ```
        
        `review.repository.js`
        
        **리뷰에 이미지 추가하기**
        
        ```jsx
        import { prisma } from "../prismaClient.js";
        
        // 특정 리뷰 조회
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
        
        //리뷰 이미지 추가
        export const addReviewImageRepository = async (reviewId, reviewImageData) => {
          console.log("addReviewImageRepository - review_id:", reviewId);
        
          const reviewImage = await prisma.reviewImage.create({
            data: {
              review_id: reviewId,
              image_url: reviewImageData.image_url,
            },
          });
        
          console.log("리뷰 이미지 저장 완료!", reviewImage.review_image_id);
        
          return reviewImage;
        };
        
        ```
        
        `reviewimage.repository.js`
        
        **가게 정보 추가하기**
        
        ```jsx
        import { prisma } from "../prismaClient.js"; 
        
        export const addStoreToDB = async (storeData) => {
          try {
            // region_id 검증 (NULL 방지 및 타입 변환)
            const regionId = Number(storeData.regionId); // 문자열이 들어올 경우 숫자로 변환
            if (!regionId) {
              throw new Error("regionId가 올바르게 전달되지 않았습니다.");
            }
        
            console.log("저장할 regionId:", regionId);
        
            // store_name 검증
            if (!storeData.storeName) {
              throw new Error("storeName이 올바르게 전달되지 않았습니다.");
            }
        
            console.log("저장할 storeName:", storeData.storeName);
        
            // 🔎 Region 테이블에서 해당 region_id가 존재하는지 확인
            const regionExists = await prisma.region.findUnique({
              where: { region_id: regionId },
            });
        
            if (!regionExists) {
              throw new Error(`region_id ${regionId}가 region 테이블에 존재하지 않습니다.`);
            }
        
            console.log("region_id 존재 확인 완료");
        
            // 🔎 가게 정보 삽입
            const store = await prisma.store.create({
              data: {
                region_id: regionId, // FK 참조
                store_name: storeData.storeName,
                store_image_url: storeData.storeImageUrl,
                opening_hours: storeData.openingHours,
                open_status: storeData.openStatus,
                location: storeData.location,
                cuisine: storeData.cuisine,
                average_rating: storeData.averageRating,
              },
            });
        
            console.log("가게 정보 저장 완료!");
        
            return store;
          } catch (error) {
            console.error("DB 저장 중 오류 발생:", error);
            throw new Error(`가게 정보 저장 실패: ${error.message}`);
          }
        };
        
        ```
        
        `store.repositoy.js`
        
        **도전 중인 사용자 미션 조회 및 새로운 도전 중 추가하기**
        
        ```jsx
        import { prisma } from "../prismaClient.js";
        
        // 특정 사용자의 진행 중인 미션 조회
        export const findUserMissionsRepository = async (userId) => {
          return await prisma.userMission.findMany({
            where: {
              user_id: userId,
              mission_status: "in_progress",
            },
            select: {
              user_mission_id: true,
              mission_status: true,
              start_at: true,
              completed_at: true,
              mission: {
                select: {
                  mission_content: true,
                  reward_point: true,
                },
              },
            },
          });
        };
        
        // 새로운 미션을 `in_progress` 상태로 추가
        export const addUserMissionRepository = async (userMissionData) => {
          const userMission = await prisma.userMission.create({
            data: {
              mission_id: userMissionData.mission_id,
              user_id: userMissionData.user_id,
              region_id: userMissionData.region_id,
              mission_status: userMissionData.mission_status,
              start_at: userMissionData.start_at,
              completed_at: userMissionData.completed_at,
            },
          });
        
          console.log("새로운 미션 시작!", userMission.user_mission_id);
        
          return userMission;
        };
        
        ```
        
        `usermission_repository.js`
        
    - 3. 내가 진행 중인 미션 목록
        
        지난 주에 구현했던 진행 중 미션 목록 조회 API를 변형하여  커서 페이지네이션을 추가하였다.
        
        이 때, 미션 조회의 기본 값 = “`in_progress`”로 설정하였다.
        
        **API**
        
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
        
        **Service**
        
        ```jsx
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
        
        **Repository**
        
        ```jsx
        import { prisma } from "../prismaClient.js";
        
        export const findUserMissionsRepository = async (userId, cursor, limit) => {
          return await prisma.userMission.findMany({
            where: {
              user_id: userId,
              mission_status: "in_progress",
            },
            take: limit, // 한 번에 가져올 개수 설정
            skip: cursor ? 1 : 0, // 커서 다음 데이터부터 가져오기
            cursor: cursor ? { user_mission_id: cursor } : undefined, // 커서 위치 지정
            orderBy: {
              user_mission_id: "asc", // 오름차순 정렬
            },
            select: {
              user_mission_id: true,
              mission_status: true,
              start_at: true,
              completed_at: true,
              mission: {
                select: {
                  mission_content: true,
                  reward_point: true,
                },
              },
            },
          });
        };
        ```
        

## ⚡ 트러블 슈팅

- ⚡ 이슈 No. 1
    
    **`이슈`**
    
    👉 회원가입 API를 prisma ORM으로 변환하는 도중, `inactive_date`를 `schema.prisma`에 model로 선언했음에도 불구, 찾지 못하는 오류 발생
    
    ![image.png](Chapter%206%20ORM%20%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A2%E1%84%87%E1%85%A9%E1%84%80%E1%85%B5%201e7b57f4596b8047889aed6421458a55/image.png)
    
    **`문제`**
    
    👉 [어떤 이유로 해당 이슈가 일어났는지 작성]
    
    **`해결`**
    
    👉  [해결 방법 작성]
    
    **`참고 레퍼런스`**
    
    - [문제 해결 시 참고한 링크]