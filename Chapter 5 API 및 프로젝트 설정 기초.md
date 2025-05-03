## 🎯 핵심 키워드

- 환경 변수
    - API 설계에서 환경 변수 설정은 필수적인 작업
    - 명령행을 보다 편리하게 사용 가능.
    - <목적>
        1. 보안 : 데이터베이스 접속 정보, API 키, 비밀번호 등을 노출하지 않고 환경 변수로 관리함으로써 보안성 강화.
        2. 유연성 : 개발, 테스트, 배포 환경에 따라 다른 값 쉽게 설정 가능.
        3. 유지보수 : 코드 수정 없이 설정 변경만으로 시스템 관리 가능.
    - <환경 변수>
        1. `PORT` : 서버가 실행될 포트 번호
        2. `DB_HOST` : 데이터 베이스 호스트 주소
        3. `DB_PORT` : 데이터 베이스 포트 번호
        4. `DB_USER` : 데이터 베이스 사용자 이름
        5. `DB_NAME` : 데이터 베이스 이름
        6. `API_KEY` : API 통신 시 사용할 인증 키
        7. `JWT_SECRET` : JWT 인증에 사용되는 비밀 키
        8. `NODE_ENV` : 실행 환경
        9. `LOG_LEVEL` : 로그 수준
    - 저장 장소 : 환경 변수는 보통 `.env` 파일에 저장되며 Node.js 환경에서는 `dotenv` 라이브러리 활용.
- CORS
    - Cross Origin(출처를 의미하며, URL에서 schema, host, post까지를 의미함.) Resource Sharing
    - 다른 출처 자원의 공유에 대한 정책
    - 'SOP(같은 origin만 리소스를 공유할 수 있게 하는 정책)를 위반하나 CORS 정책을 따르면 허용하겠다.'
    - <기본 동작>
        1. 웹에서 HTTP 요청을 서버로 보낼 때 브라우저는 요청에 `origin` 헤더를 추가, `origin`을 담아 보냄.
        2. 서버는 응답 헤더 `Access-Control-Allow-Origin`에 이 리소스에 접근할 수 있는 `origin`을 담아 보냄.
        3. 브라우저는 교차출처 응답에 대해 요청 헤더의 `origin`이 응답 헤더의 `Access-Control-Allow-Origin`에 적합한지 판단함.
        3.1. 적합하지 않은 경우 : 응답이 `200 OK` 이더라도 버리고 에러를 출력.
        3.2. 적합한 경우 : 문제없이 가져옴.
    - Preflight Request(예비 요청) : 클라이언트가 실제 요청 전에 OPTIONS 메소드를 사용해 서버의 CORS 정책을 확인하는 과정.
    - Simple Request : 다음 조건을 충족할 경우, simple request를 진행함.
        1. 요청 메소드가 `GET,` `HEAD`, `POST` 중 하나
        2. `Accept`, `Accept-Language`, `Content-Language`, `Content-Type`, `DPR`, `Downlink`, `Save-Data`, `Viewport-Width`, `Width` 헤더
        3. `Content-Type` 헤더가 `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`중 하나. 아닐 경우 예비 요청으로 동작.
    - Credentialed Request(인증된 요청) : 클라이언트에서 서버에게 자격 증명(인증 정보)를 실어 요청할 때 사용됨. 즉, 클라이언트에서 인증 정보를 포함하여 다른 출처로 요청을 보낼 경우 이로 동작.
    - <에러 발생>
        1. 서버에 CORS 헤더가 제대로 설정되지 않음.
        2. 클라이언트의 요청 출처가 서버에서 허용되지 않음.
        3. Preflight 요청에 대한 서버 응답이 적절하지 않음.
- DB Connection, DB Connection Pool
    
    <DB Connection>
    
    - 애플리케이션과 데이터 베이스 서버가 통신할 수 있도록 하는 기능.
    - 애플리케이션이 베이터 베이스에 쿼리를 실행하거나 데이터를 가져오는 데 사용됨.
    - <과정>
        1. 데이터 베이스 드라이버를 사용, `host`, `port`, `user`, `password` 등으로 데이터 베이스와 연결을 생성함.
        2. Connection 객체를 생성, 연결을 나타내는 객체를 얻음.
        3. 연결이 지속적으로 열려 있는 상태로 데이터 베이스 요청을 처리함.
        4. 작업이 완료되면 연결을 닫아 리소스를 절약하고 DB 연결을 해지함.
        
        ```jsx
        connection.close();
        ```
        
    - 소규모 요청 처리에 적합함.
    - 간단하며 코드가 적어 구현 복잡성 면에서 효율적임.
    - DB를 연결할 때마다 Connection 객체를 만드는 것은 좋지 않음!
        1. 네트워크 비용 발생
        2. 리소스 사용으로 인한 서버 리소스 소모
        3. 시간과 메모리 소모
        
    
    <DB Connection Pool>
    
    - Connection 객체의 반복적인 생성과 해제를 피하고, 효율적인 DB 연결 관리를 위해 사용됨.
    - 데이터 베이스로의 추가 요청이 필요할 때 연결을 재사용할 수 있도록 관리되는 데이터 베이스 연결의 캐시.
    - <과정>
        1. 애플리케이션 시작 시 미리 일정 수의 객체 생성, Pool에 보관함.
        2. 이후 DB 작업이 필요할 때마다 Pool에서 객체를 가져다 사용하고 완료되면 다시 반환.
    - <장점>
        1. 성능 향상 : 응답 시간 단축.
        2. 자원 관리 : 불필요한 연결을 만들지 않고 연결을 재사용함으로써 필요 자원 최적화.
        3. 동시성 관리 : 다수의 사용자가 동시에 접속해도 안정적인 처리가 가능함.
        4. 연결 풀링 : 연결의 개수를 제한함으로써 과부하 방지.
        5. 커넥션 오버헤드(DB 연결을 생성하고 해제하는 과정에서 발생하는 추가 비용과 부하) 감소 : 반복적인 데이터 베이스 연결/해제 작업으로 오버헤드 감소.
    - <단점>
        1. 리소스 사용 : 일정 수의 연결을 미리 생성하고 유지해야 하므로 일정 수의 리소스를 소모함.
        2. 설정 관리의 복잡성 : 일정한 관리와 모니터링이 필요.
        3. 커넥션 누수 : 연결을 올바르게 반환하지 않거나 예외가 발생하면 누수가 발생할 수 있음.
- 비동기 (async, await)
    
    <동기>
    
    - 작업을 실행할 때에 그 작업이 끝나기를 기다리는 방식
    - 작업의 순서를 보장하고 작업이 끝날 때까지 기다리는 것이 가능함.
    
    <비동기>
    
    - 어떤 작업을 실행할 때에 그 작업이 끝나지 않더라도 다음 코드를 실행하는 방식.
    - 작업 시간을 절약하고 병렬적인 작업 처리가 가능함.
    - <필요성>
        1. 웹 페이지의 반응성 향상
        2. 네트워크 통신 : 통신을 비동기적으로 처리, 여러 작업을 병렬적으로 수행.
        3. 병렬 처리
        4. 에러 처리 : 에러 발생 시, 콜백 함수를 실행하거나 프로그램의 안정성을 높임.
    - `async` : 함수의 앞에 붙어 해당 함수가 비동기 함수임을 나타냄.
    - `await` : 비동기 함수의 실행 결과를 기다리는 키워드. Promise 객체가 완료될 때까지 코드 실행을 일시 중지하므로 try-catch 블록 안에서 에러 처리가 가능함. `async` 함수 안에서 사용.
        
        → 만약, `fetch`에서 네트워크 에러가 발생할 경우 `await` 이후의 코드는 실행되지 않으며, `catch` 블록으로 제어가 넘어가 에러를 처리함.
        
- try/catch/finally
    - Exception Handling(예외 처리)
    - Java Script의 예외 처리(프로그램이 실행되는 동안 에러바 발생할 경우, 프로그램이 대처할 수 있도록 처리하는 것) 기법
    - `try` : 처리할 예외가 발생할지도 모를 코드 블록을 정의함.
    - `catch` : 오직 `try` 블록 내부에서 예외가 발생할 경우 호출되는 문장 블록. 예외를 처리하거나, 무시할 수도 , `throw`를 사용해 다시 발생시킬 수도 있음.
    - `finally` : `try` 블록에서 일어난 일과 관계없이 항상 실행이 보장되어야 할 뒷정리용 코드. `try` 블록이 어떻게든 종료되면 실행됨.
    
    => `catch` or `finally` 블록 생략 가능하나 `try`의 경우, `catch`나 `finally` 중 적어도 하나 이상의 블록과 함께 사용되어야 함.
    

## 🧩 요약 정리

1. API 개발을 진행할 때 : Controller, dto, service, repository 폴더로 나누어 분할하여 설계
2. POSTMAN을 이용하여 API가 제대로 설계되었는지 확인할 수 있다. (Curl 사용 가능)


## ✅ 실습 체크리스트

- [x]  본문 API 개발하고 테스트하기

## ☑️ 실습 인증

1. 회원 가입 API를 만들고 Postman으로 테스트를 해보았다.

![실습1](https://github.com/user-attachments/assets/4af70c77-5c18-4194-9f84-ad7d648dd1cb)


> 데이터를 전송하는 데 성공했다.
> 

![실습2](https://github.com/user-attachments/assets/b9f2cf75-2654-42c9-86a4-306f52104438)


> DB에 데이터가 추가되었다.
> 

## 💪 미션 기록


- 미션 기록
    1. 특정 지역에 가게 추가하기 API
    
    > 가게를 추가하기 위해 `Region` , `Store` 테이블 참조
    > 
    - RESTful API
        
        **API endpoint**
        
        <aside>
        🔑
        
        POST /store/{region_id}
        
        </aside>
        
        → 가게에 store의 정보를 새로 업로드하는 것이므로 `POST` 메소드를 사용하였다.
        
        **Request body**
        
        ```jsx
        {
        "store_name" = "00반점",
        "store_image_url" = "http://example.com/image.jpg",
        "opening_hours" = "09:00 - 23:00",
        "open_status" = "open"
        "location" = "경기도 부천시 원미구",
        "cuisine" = "중식",
        "average_rating" = "4.7"
        }
        ```
        
        → 가게에 대한 기본 정보를 입력받는다.
        
        **Request Header**
        
        ```jsx
        Authorization: Bearer <access_token>
        Content-Type : application/json
        Accept : application/json
        ```
        
        **Query string**
        
        필요 없다.
        
    - API
        
        **API URL**
        
        <aside>
        🔑
        
        POST http://localhost:3000/api/v1/regions/{region_id}/stores
        
        </aside>
        
        → `{user_id}`로 지역을 구분한다.
        
        이 때, 원활한 관리를 위해 `store.controller.js` ,  `store.dto.js` , `store.service.js` , `store.repository.js` 파일을 만들어 작업한다. 
        
        **Controller**
        
        ```jsx
        import { StatusCodes } from "http-status-codes";
        import { bodyToStore } from "../dtos/store.dto.js";
        import { addStore } from "../services/store.service.js";
        
        export const handleStoreCreation = async (req, res, next) => {
          const { regionId } = req.params; // URL에서 regionId 가져오기
          console.log("받은 regionId:", regionId); // 값 확인
        
          const storeData = bodyToStore(req.body, regionId); // DTO 변환
        
          try {
            const store = await addStore(storeData);
            res.status(StatusCodes.CREATED).json({ result: store });
          } catch (error) {
            console.error("가게 정보 추가 중 오류 발생:", error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
          }
        };
        ```
        
        **DTO**
        
        ```jsx
        export const bodyToStore = (body, regionId) => {
            if (!regionId) {
                throw new Error("regionId가 없습니다!");
              }
            return {
              regionId, // URL에서 받은 regionId
              storeName: body.store_name,
              storeImageUrl: body.store_image_url || "",
              openingHours: body.opening_hours || "00:00-00:00",
              openStatus: body.open_status || "CLOSED",
              location: body.location || "",
              cuisine: body.cuisine || "기타",
              averageRating: body.average_rating || 0,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
          };
          
          export const responseFromStore = (store) => {
            return {
              storeId: store.store_id,
              regionId: store.region_id,
              storeName: store.store_name,
              storeImageUrl: store.store_image_url,
              openingHours: store.opening_hours,
              openStatus: store.open_status,
              location: store.location,
              cuisine: store.cuisine,
              averageRating: store.average_rating,
              createdAt: store.created_at,
              updatedAt: store.updated_at,
            };
          };
        ```
        
        **Services**
        
        ```jsx
        import { responseFromStore } from "../dtos/store.dto.js";
        import { addStoreToDB } from "../repositories/store.repository.js";
        
        export const addStore = async (storeData) => {
          const storeId = await addStoreToDB(storeData); // DB 저장
          if (!storeId) {
            throw new Error("가게 정보를 저장할 수 없습니다.");
          }
        
          return responseFromStore({ ...storeData, storeId });
        };
        ```
        
        **Repositories**
        
        ```jsx
        import { pool } from "../db.config.js";
        
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
        
            // Region 테이블에서 해당 region_id가 존재하는지 확인
            const [regionExists] = await pool.query(
              `SELECT region_id FROM Region WHERE region_id = ?`,
              [regionId]
            );
        
            if (regionExists.length === 0) {
              throw new Error(`region_id ${regionId}가 Region 테이블에 존재하지 않습니다.`);
            }
        
            console.log("region_id 존재 확인 완료");
        
            // 가게 정보 삽입
            const [result] = await pool.query(
              `INSERT INTO store (region_id, store_name, store_image_url, opening_hours, open_status, location, cuisine, average_rating, created_at, updated_at) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
              [
                regionId, // FK 참조
                storeData.storeName,
                storeData.storeImageUrl,
                storeData.openingHours,
                storeData.openStatus,
                storeData.location,
                storeData.cuisine,
                storeData.averageRating,
              ]
            );
        
            console.log("가게 정보 저장 완료!");
        
            // 삽입된 가게 정보 반환
            return {
              storeId: result.insertId,
              regionId,
              storeName: storeData.storeName,
              storeImageUrl: storeData.storeImageUrl,
              openingHours: storeData.openingHours,
              openStatus: storeData.openStatus,
              location: storeData.location,
              cuisine: storeData.cuisine,
              averageRating: storeData.averageRating,
              createdAt: new Date(),
              updatedAt: new Date(),
            };
          } catch (error) {
            console.error("DB 저장 중 오류 발생:", error);
            throw new Error(`가게 정보 저장 실패: ${error.message}`);
          }
        };
        
        ```
        
        **Body**
        
        ```jsx
        {
          "store_name": "스타벅스 가톨릭대점",
          "store_image_url": "http://example.com/store.jpg",
          "opening_hours": "08:00-22:00",
          "open_status": "OPEN",
          "location": "경기도 부천시 원미구",
          "cuisine": "카페",
          "average_rating": 4.5
        }
        ```
        
        ![가게 추가](https://github.com/user-attachments/assets/6d0d7c42-d2e4-4bc7-8f40-ecf2097560e6)

        
        > 특정 지역에 가게의 정보가 성공적으로 저장되었다.
        > 
    
    2. **가게에 리뷰 추가하기 API**
        - 리뷰를 추가하려는 가게가 존재하는지 검증이 필요합니다.
    
    > 가게에 리뷰를 추가하기 위해 `Review` , `Review_image` , `Store` , `User` 테이블 참조
    > 
    - RESTful API
        
        **API Endpoint**
        
        <aside>
        🔑
        
        POST /review
        
        </aside>
        
        → 리뷰를 새로 작성하는 것이므로 `POST`를 사용하였다.
        
        <aside>
        🔑
        
        POST /image_url/{review_id}
        
        </aside>
        
        → 리뷰 작성 시 함께 이미지를 첨부하는 것이므로 `POST`를 사용하였다.
        
        **Request Body**
        
        ```jsx
        {
        “rating” : 4
        “review_content” : “맛있게 잘 먹었습니다!”
        }
        ```
        
        → 별점 설정과 리뷰 작성
        
        ```jsx
        {
        “image_url” : “url”
        }
        ```
        
        → 이미지를 첨부하되, 초기 테이블 설정에서 `image_url`로 설정하였기 때문에 url을 입력받는다.
        
        **Request Header**
        
        ```jsx
        Authorization: Bearer <access_token>
        Content-Type : application/json
        Accept : application/json
        ```
        
        **Query String**
        
        필요 없다.
        
    - API
        
        **API URL**
        
        <aside>
        🔑
        
        POST http://localhost:3000/api/v1/review/{store_id}/user_id}
        
        </aside>
        
        → `{store_id}`로 가게를, `{user_id}`로 사용자를 구분한다.
        
        <aside>
        🔑
        
        POST http://localhost:3000/api/v1/review/{review_id}/images
        
        </aside>
        
        → `{review_id}`로 특정 리뷰에 이미지를 삽입한다.
        
        이 때, 원활한 관리를 위해 `review.controller.js` , `review_image.controller.js` , `review.dto.js` ,`review_image.dto.js` , `review.service.js` , `review_image.service.js` ,`review.repository.js` ,`review_image.repository.js` ,파일을 만들어 작업한다. 
        
        **Controller** 
        
        - `review.controller.js`
        
        ```jsx
        import { StatusCodes } from "http-status-codes";
        import { createReviewDTO } from "../dtos/review.dto.js";
        import { addReviewService } from "../services/review.service.js";
        
        export const addReview = async (req, res) => {
          try {
            const { store_id, user_id } = req.params; // URL에서 store_id와 user_id 가져오기
            const reviewData = createReviewDTO(req.body); // DTO 변환 및 검증
        
            console.log("받은 store_id:", store_id);
            console.log("받은 user_id:", user_id);
            console.log("받은 reviewData:", reviewData);
        
            const newReview = await addReviewService(store_id, user_id, reviewData); // 서비스 호출
        
            res.status(StatusCodes.CREATED).json({
              message: "Review created successfully",
              review: newReview,
            });
          } catch (error) {
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
              error: error.message || "Internal Server Error",
            });
          }
        };
        ```
        
        - `review_image.controller.js`
        
        ```jsx
        import { StatusCodes } from "http-status-codes";
        import { createReviewImageDTO } from "../dtos/reviewimage.dto.js";
        import { addReviewImageService } from "../services/reviewimage.service.js";
        
        export const addReviewImage = async (req, res) => {
          try {
            const review_id = Number(req.params.review_id); //review_id를 숫자로 변환
            console.log("받은 review_id:", review_id);
        
            //먼저 DTO로 변환 및 검증을 수행한 후 사용
            const reviewImageData = createReviewImageDTO(req.body);
            console.log("받은 reviewImageData:", reviewImageData);
        
            const newReviewImage = await addReviewImageService(review_id, reviewImageData);
        
            res.status(StatusCodes.CREATED).json({
              message: "Review image uploaded successfully",
              reviewImage: newReviewImage,
            });
          } catch (error) {
            res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
              error: error.message || "Internal Server Error",
            });
          }
        };
        ```
        
        **DTO**
        
        - `review.dto.js`
        
        ```jsx
        export const createReviewDTO = (data) => {
            const requiredFields = ["rating", "review_content"];
            if (requiredFields.some((field) => !data[field])) {
              throw new Error(`Missing required fields: ${requiredFields.join(", ")}`);
            }
          
            return {
              rating: data.rating,
              review_content: data.review_content,
            };
          };
        ```
        
        - `review_image.dto.js`
        
        ```jsx
        export const createReviewImageDTO = (data) => {
          if (!data.image_url) {
            throw new Error("Missing required field: image_url");
          }
          return { image_url: data.image_url };
        };
        ```
        
        **Services**
        
        - `review.service.js`
        
        ```jsx
        import { findStoreByIdRepository, findUserByIdRepository, addReviewRepository } from "../repositories/review.repository.js";
        
        export const addReviewService = async (storeId, userId, reviewData) => {
          // 가게 존재 여부 확인
          const store = await findStoreByIdRepository(storeId);
          if (!store) {
            throw new Error(`Store ID ${storeId} not found.`);
          }
        
          // 사용자 존재 여부 확인
          const user = await findUserByIdRepository(userId);
          if (!user) {
            throw new Error(`User ID ${userId} not found.`);
          }
        
          // 리뷰 작성
          return await addReviewRepository(storeId, userId, reviewData);
        };
        
        ```
        
        → 리뷰를 추가하기 전에 가게와 사용자가 존재하는지 검증을 거쳐야 한다. 때문에 `!store` , `!user`일 경우, `throw`를 통해 에러를 처리한다.
        
        - `review_image.service.js`
        
        ```jsx
        import { findReviewByIdRepository, addReviewImageRepository } from "../repositories/reviewimage.repository.js";
        
        export const addReviewImageService = async (reviewId, reviewImageData) => {
          const review = await findReviewByIdRepository(reviewId);
          if (!review) {
            console.error("해당 review를 찾을 수 없습니다. reviewId:", reviewId);
            throw new Error(`Review ID ${reviewId} not found.`);
          }
        
          console.log("가져온 review 데이터:", review); // 확인용
          console.log("review_id to insert:", review.review_id);
        
          return await addReviewImageRepository(review, reviewImageData);
        };
        ```
        
        **Repositories**
        
        - `review.repository.js`
        
        ```jsx
        import { pool } from "../db.config.js";
        
        export const findStoreByIdRepository = async (storeId) => {
          const [rows] = await pool.query("SELECT * FROM Store WHERE store_id = ?", [storeId]);
          return rows.length > 0 ? rows[0] : null;
        };
        
        export const findUserByIdRepository = async (userId) => {
          const [rows] = await pool.query("SELECT * FROM user WHERE user_id = ?", [userId]);
          return rows.length > 0 ? rows[0] : null;
        };
        
        export const addReviewRepository = async (storeId, userId, reviewData) => {
          const [result] = await pool.query(
            `INSERT INTO Review (store_id, user_id, rating, review_content, created_at, updated_at)
             VALUES (?, ?, ?, ?, NOW(), NOW())`,
            [storeId, userId, reviewData.rating, reviewData.review_content]
          );
        
          console.log("리뷰 저장 완료!", result.insertId);
        
          return {
            review_id: result.insertId,
            store_id: storeId,
            user_id: userId,
            ...reviewData,
            created_at: new Date(),
            updated_at: new Date(),
          };
        };
        ```
        
        - `review_image.repository.js`
        
        ```jsx
        import { pool } from "../db.config.js";
        
        export const findReviewByIdRepository = async (reviewId) => {
          const [rows] = await pool.query(
            "SELECT review_id, rating, review_content FROM Review WHERE review_id = ?",
            [reviewId]
          );
          return rows.length > 0 ? rows[0] : null; //리뷰 존재 여부 확인
        };
        
        export const addReviewImageRepository = async (review, reviewImageData) => {
          const { review_id, rating, review_content } = review;
        
          console.log("🔹 addReviewImageRepository - review_id:", review_id); // ✅ 이 줄 추가
        
          const [result] = await pool.query(
            `INSERT INTO Review_image (review_id, image_url, created_at, updated_at) 
             VALUES (?, ?, NOW(), NOW())`,
            [review_id, reviewImageData.image_url]
          );
        
          console.log("리뷰 이미지 저장 완료!", result.insertId);
        
          return {
            review_image_id: result.insertId,
            review_id,
            rating,
            review_content,
            ...reviewImageData,
            created_at: new Date(),
            updated_at: new Date(),
          };
        };
        
        ```
        
        **Body**
        
        ```jsx
        {
            "rating" : 4.3,
            "review_content" : "사장님이 친절하시고 음식이 맛있어요!"
        }
        ```
        
        ```jsx
        {
          "image_url": "http://example.com/sample.jpg"
        }
        ```
        
        ![리뷰 작성](https://github.com/user-attachments/assets/c2dbf532-a736-4a79-9cdc-17dee54f991f)

        
        > 특정 가게에 특정 사용자가 리뷰를 작성하는 API가 성공적으로 작동하였다.
        > 
        
        ![리뷰에 이미지 추가](https://github.com/user-attachments/assets/10a7849d-a51a-46d1-a85c-85f3a286bf94)

        
        > 특정 리뷰에 이미지가 정상적으로 추가되었다.
        > 
    
    3. 가게에 미션 추가하기 API
    
    > 가게에 미션을 추가하기 위해 `Store` , `Mission` 테이블 참조
    > 
    - RESTful API
        
        **API Endpoint**
        
        <aside>
        🔑
        
        POST /mission/{store_id}
        
        </aside>
        
        → 미션 내용을 추가 생성하는 것이기 때문에 `POST` 메소드를 사용하였고, 가게 별로 분류하기 위해 `{store_id}`를 사용하였다.
        
        **Request Body**
        
        ```jsx
        {
        "mission_content" = "15000원 이상 식사",
        "reward_point" = 500
        }
        ```
        
        **Request Header**
        
        ```jsx
        Authorization : Bearer <access_token>
        Content-Type : application/json
        Accept : application/json
        ```
        
        **Query String**
        
        필요 없다.
        
    - API
        
        **API URL**
        
        <aside>
        🔑
        
        POST http://localhost:3000/api/v1/mission/{store_id}
        
        </aside>
        
        → `{store_id}`로 지역을 구분한다.
        
        이 때, 원활한 관리를 위해 `mission.controller.js` ,  `mission.dto.js` , `mission.service.js` , `mission.repository.js` 파일을 만들어 작업한다. 
        
        **Controller**
        
        ```jsx
        import { StatusCodes } from "http-status-codes";
        import { createMissionDTO } from "../dtos/mission.dto.js";
        import { addMissionService } from "../services/mission.service.js";
        
        export const createMission = async (req, res) => {
            try {
              const store_id = Number(req.params.store_id);
              console.log("🔹 받은 store_id:", store_id); // ✅ store_id 확인
          
              console.log("🔹 받은 request body:", req.body); // ✅ 요청 body 확인
          
              const missionData = createMissionDTO(req.body); // DTO 변환 및 검증
              console.log("🔹 DTO 변환 후 missionData:", missionData); // ✅ DTO 변환 후 데이터 확인
          
              const newMission = await addMissionService(store_id, missionData);
          
              res.status(201).json({
                message: "Mission created successfully",
                mission: newMission,
              });
            } catch (error) {
              res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
            }
        };
        ```
        
        **DTO**
        
        ```jsx
        export const createMissionDTO = (data) => {
            if (!data.mission_content || !data.reward_point) {
              throw new Error("Missing required fields: mission_content or reward_point");
            }
          
            if (isNaN(data.reward_point)) {
              throw new Error("Reward point must be a number");
            }
          
            return {
              mission_content: data.mission_content,
              reward_point: Number(data.reward_point), // 숫자로 변환
            };
          };
          
        ```
        
        → `reward_point`를 수의 개념이기 때문에 숫자로 변환하여 준다.
        
        **Services**
        
        ```jsx
        import { findStoreByIdRepository, addMissionRepository } from "../repositories/mission.repository.js";
        
        export const addMissionService = async (storeId, missionData) => {
          // 가게 존재 여부 확인
          const store = await findStoreByIdRepository(storeId);
          if (!store) {
            throw new Error(`Store ID ${storeId} not found.`);
          }
        
          // 미션 추가
          return await addMissionRepository(storeId, missionData);
        };
        
        ```
        
        → 가게에 미션을 추가하기 위해서는 리뷰 작성과 마찬가지로 가게가 존재해야하므로 `!store` 일 경우, `throw`를 이용해 에러 처리를 한다.
        
        **Repositories**
        
        ```jsx
        import { pool } from "../db.config.js";
        
        export const findStoreByIdRepository = async (storeId) => {
          const [rows] = await pool.query("SELECT * FROM Store WHERE store_id = ?", [storeId]);
          return rows.length > 0 ? rows[0] : null; // 가게 존재 여부 검증
        };
        
        export const addMissionRepository = async (storeId, missionData) => {
            // `Store` 테이블에서 `region_id` 가져오기
            const [store] = await pool.query("SELECT region_id FROM Store WHERE store_id = ?", [storeId]);
            if (!store.length) {
              throw new Error(`Store ID ${storeId} not found.`);
            }
            const regionId = store[0].region_id;
          
            // `region_id`를 포함하여 `Mission` 데이터 삽입
            const [result] = await pool.query(
              `INSERT INTO Mission (store_id, region_id, mission_content, reward_point, created_at, updated_at) 
               VALUES (?, ?, ?, ?, NOW(), NOW())`,
              [storeId, regionId, missionData.mission_content, missionData.reward_point]
            );
          
            return {
              mission_id: result.insertId,
              store_id: storeId,
              region_id: regionId,
              ...missionData,
              created_at: new Date(),
              updated_at: new Date(),
            };
          };
        ```
        
        **Body**
        
        ```jsx
        {
            "mission_content": "1500원 이상 식사",
            "reward_point": "500"
        }
        ```
        
        ![가게에 미션 추가](https://github.com/user-attachments/assets/e9a71a20-7532-43b2-a607-5ab5c10a6cc1)


        
        > 가게에 성공적으로 미션이 추가되었다.
        > 
    
    4. **가게의 미션을 도전 중인 미션에 추가(미션 도전하기) API**
        - 도전하려는 미션이 이미 도전 중이지는 않은지 검증이 필요합니다.
        - 3번 API를 구현하지 않은 경우, 4번에서는 DB에 미션 정보를 수동으로 기입한 후 진행해야 합니다.
    
    > 초기 DB를 구성할 때에 `User_mission` 테이블을 이용해 `mission_status` 컬럼을 지정하였다.
    > 
    
    > 가게의 미션을 도전 중 상태로 추가하기 위해 `Mission` 테이블과 `mission_status`를 컬럼으로 가지는 `User_mission` 테이블 참조
    > 
    - RESTful API
        
        **API Endpoint**
        
        <aside>
        🔑
        
        GET /user/{user_id}?mission_status=in_progress
        
        </aside>
        
        → 진행 중인 미션을 조회하기 위해 상태를 `in_progress`로 필터링하여 조회한다.
        
        <aside>
        🔑
        
        GET /user/{user_id}?mission_status=completed
        
        </aside>
        
        → 진행 완료인 미션을 조회하기 위해 상태를 `completed`로 필터링하여 조회한다.
        
        **Request Body**
        
        → 조회의 목적으로 `GET` 메소드를 사용하였으므로 Request Body를 따로 작성하지 않아도 된다.
        
        **Request Header**
        
        ```jsx
        Authorization : Bearer <access_token>
        Accept : application/json
        ```
        
        **Query String**
        
        `in_progress`, `completed`
        
    - API
        
        **API URL**
        
        <aside>
        🔑
        
        GET http://localhost:3000/api/v1/user/{user_id}/missions
        
        </aside>
        
        → 특정 사용자가 진행 중인 미션을 조회하기 위해 `user_id` 로 참조한다.
        
        <aside>
        🔑
        
        POST http://localhost:3000/api/v1/user-mission/{user_id}
        
        </aside>
        
        → 특정 사용자의 미션 목록에 새로 시작한 미션을 추가하기 위해 POST와 `user_id` 을 사용한다.
        
        이 때, 원활한 관리를 위해 `usermission.controller.js` ,  `usermission.dto.js` , `usermission.service.js` , `usermission.repository.js` 파일을 만들어 작업한다. 
        
        **Controller**
        
        ```jsx
        import { StatusCodes } from "http-status-codes";
        import { createUserMissionDTO } from "../dtos/usermission.dto.js";
        import { addUserMissionService, getUserMissionsService } from "../services/usermission.service.js";
        
        //특정 사용자의 진행 중인 미션 조회
        export const getUserMissions = async (req, res) => {
          try {
            const user_id = Number(req.params.user_id);
            console.log("받은 user_id:", user_id);
        
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
        
        //사용자가 새로운 미션에 도전 (`in_progress` 상태로 추가)
        export const addUserMission = async (req, res) => {
          try {
            const user_id = Number(req.params.user_id); // URL에서 user_id 가져오기
            console.log("받은 user_id:", user_id);
        
            const userMissionData = createUserMissionDTO(req.body, user_id); // DTO 검증 및 변환
            console.log("받은 userMissionData:", userMissionData);
        
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
        
        **Services**
        
        ```jsx
        import { addUserMissionRepository, findUserMissionsRepository } from "../repositories/usermission.repository.js";
        
        export const addUserMissionService = async (userMissionData) => {
          return await addUserMissionRepository(userMissionData);
        };
        
        export const getUserMissionsService = async (userId) => {
          const userMissions = await findUserMissionsRepository(userId);
        
          if (!userMissions.length) {
            throw new Error(`No ongoing missions found for user ID ${userId}.`);
          }
        
          return userMissions;
        };
        
        ```
        
        **Repositories**
        
        ```jsx
        import { pool } from "../db.config.js";
        
        // 특정 사용자의 진행 중인 미션 조회
        export const findUserMissionsRepository = async (userId) => {
          const [missions] = await pool.query(
            `SELECT um.user_mission_id, m.mission_content, m.reward_point, um.mission_status, um.start_at, um.completed_at
             FROM User_mission um
             JOIN Mission m ON um.mission_id = m.mission_id
             WHERE um.user_id = ? AND um.mission_status = 'in_progress'`,
            [userId]
          );
        
          return missions;
        };
        
        // 새로운 미션을 `in_progress` 상태로 추가
        export const addUserMissionRepository = async (userMissionData) => {
          const [result] = await pool.query(
            `INSERT INTO User_mission (mission_id, user_id, region_id, mission_status, start_at, completed_at) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
              userMissionData.mission_id,
              userMissionData.user_id,
              userMissionData.region_id,
              userMissionData.mission_status,
              userMissionData.start_at,
              userMissionData.completed_at,
            ]
          );
        
          console.log("새로운 미션 시작!", result.insertId);
        
          return {
            user_mission_id: result.insertId,
            ...userMissionData,
          };
        };
        ```
        
        ![도전 중미션 조회](https://github.com/user-attachments/assets/ff09180d-9259-4855-9868-237c6e0fecc2)

        
        > 사용자의 도전 중인 미션을 조회한다.
        > 
        
        ![도전 중 미션 추가](https://github.com/user-attachments/assets/d2d1a774-df9f-459d-9b45-f77a330be63b)

        
        > 사용자에게 새로운 미션을 추가한다.
        > 

## ⚡ 트러블 슈팅

- ⚡ No.1
    
    **`이슈`**
    
    👉 코드를 모두 짜고 `Postman`으로 테스트 하는 도중, 파일의 경로를 찾을 수 없다는 오류가 발생하였다.
  
    <img width="650" alt="오류" src="https://github.com/user-attachments/assets/31b0314b-a614-43b3-b3b0-b24edaa6675a" />

    
    **`문제`**
    
    👉 `services` 디렉토리의 `user.service.js`파일에서 경로가 잘못 설정되어 있었다.
    
    ```jsx
    ../user.dto.js
    ```
    
    > 잘못 설정되어 있던 경로
    > 
    
    **`해결`**
    
    👉  현재 디렉토리에서 벗어나 `dto` 디렉토리 속 파일을 `import`해야하므로 아래와 같이 수정하였다.
    
    ```jsx
    ../dtos/user.dto.js
    ```
    
    > 수정된 경로
    > 
    
- ⚡ No.2
    
    **`이슈`**
    
    👉 리뷰를 작성하고, 해당 리뷰에 이미지를 추가하는 API를 작성하고 실행시키는 과정에서 review_image 테이블은 rating, review_content 컬럼이 존재하지 않음에도 불구, 해당 데이터들을 불러오지 못해 발생하는 오류가 지속되었다.
    
    **`문제`**
    
    👉 리뷰 작성과 리뷰에 이미지를 추가하는 API의 URL을 유사하게 작성하여 id값이 제대로 참조되지 못한 것이 원인으로 보인다.
    
    ```jsx
    // 리뷰 작성 API
    app.post("/api/v1/review/:store_id/:user_id", addReview);
    // 리뷰에 이미지 추가 API
    app.post("/api/v1//review/:review_id/image", addReviewImage);
    ```
    
    > 수정 전 URL
    > 
    
    **`해결`**
    
    👉  둘의 URL의 구조를 바꾸었다.
    
    ```jsx
    // 리뷰 작성 API
    app.post("/api/v1/review/:store_id/:user_id", addReview);
    // 리뷰에 이미지 추가 API
    app.post("/api/v1/images/review/:review_id", addReviewImage);
    ```
    
    > 수정 후 URL
    > 
