## 🎯 핵심 키워드

- 미들웨어
    - 서로 다른 어플리케이션이 서로 통신하는 데 사용되는 소프트웨어
    - 단일 시스템에 원활하게 통합할 수 있도록 다양한 기술, 도구, 데이터베이스 간의 다리 역할을 수행.
    - 중요한 이유 : 서로 다른 소프트웨어 구성 요소 사이를 연결하지 않고 자유롭게 비즈니스 로직 및 기능에 중점을 둘 수 있음.
    - <사용 사례>
        1. 게임 개발 : 미들 웨어를 게임 엔진으로 사용.
        2. 전자 : 미들 웨어를 사용하여 다양한 유형의 센서를 컨트롤러와 통합.
        3. 소프트웨어 개발 : 미들 웨어를 사용하여 서로 다른 소프트웨어 구성 요소를 다른 어플리케이션에 통합.
        4. 데이터 전송 : 미들 웨어를 사용하여 안전하게 데이터 스트림을 송수신함.
        5. 분산 애플리케이션 : 분산 애플리케이션이 원활하게 작동하도록 미들 웨어가 프론트엔드 애플리케이션과 백엔드 애플리케이션 간에 통신함.
    - <미들 웨어 소프트웨어의 공통 구성 요소>
        1. 관리 콘솔 : 미들 웨어 시스템의 활동, 소프트웨어 규칙 및 구성에 대한 개요 제공.
        2. 클라이언트 인터페이스 : 다른 애플리케이션, 데이터 베이스 또는 마이크로서비스와 상호 작용.
        3. 미들웨어 내부 인터페이스 : 여러 구성 요소를 하나로 묶는 소프트웨어 연결 역할.
        4. 플랫폼 인터페이스 : 미들 웨어 프로그램이 다양한 플랫폼과 호환되는 확인.
        5. 계약 관리자 : 데이터 교환 규칙을 정의함.
        6. 세션 관리자 : 애플리케이션 및 미들 웨어 사이에 안전한 통신 채널 설정.
        7. 데이터 베이스 관리자 : 필요에 따라 서로 다른 데이터 베이스 유형과의 통합 담당.
        8. 런타임 모니터 : 미들웨어에서의 데이터 이동을 지속적으로 모니터링함.
    - <미들웨어 기능>
        1. 분산 애플리케이션 간의 안전한 통신 채널 제공.
        2. 트래픽 흐름을 관리하여 특정 애플리케이션 또는 파일 서버에 과도한 트래픽이 전달되지 않게 함.
        3. 미들웨어는 결과를 분류하고 필터링한 다음 프론트엔드 애플리케이션에 전송함.
- HTTP 상태 코드
    - 특정 HTTP 요청이 성공적으로 완료되었는지 알려줌.
    - <응답 종류>
        1. 정보를 제공하는 응답
        2. 성공적인 응답
        3. 리다이렉트
        4. 클라이언트 에러
        5. 서버 에러
    - <상태 코드 종류 - 주요 코드 정리>
        1. 정보 응답 :
            1. `100 Continue` : 지금까지의 상태가 괜찮으며 클라이언트가 계속해서 요청을 하거나 이미 요청을 완료한 경우에는 무시해도 되는 것을 알려줌.
            2. `101 Switching Protocol` : 클라이언트가 보낸 Upgrade 요청 헤더에 대한 응답에 들어가며 서버에서 프로토콜을 변경할 것임을 알려줌.
        2. 성공 응답 :
            1. `200 OK` : 요청이 성공적으로 되었음. 성공의 의미는 HTTP 메소드에 따라 달라짐.
            2. `201 Created` : 요청이 성공적이었으며 그 결과로 새로운 리소스가 생성되었음.
            3. `202 Accepted`: 요청을 수신하였지만 그에 응하여 행동할 수 없음.
        3. 리다이렉션 메시지 :
            1. `300 Multiple Choice` : 요청에 대해서 하나 이상의 응답이 가능함.
            2. `301 Moved Permanently` : 요청한 리소스의 URL가 변경되었음을 의미.
            3. `302 Found` : 요청한 리소스의 URI가 일시적으로 변경되었음을 의미.
        4. 클라이언트 에러 응답 :
            1. `400 Bad Request` : 잘못된 문법으로 인하여 서버가 요청을 이해할 수 없음을 의미함.
            2. `401 Unauthorized` : 비인증(unauthenticated)을 의미함.
            3. `404 Not Found` : 요청받은 리소스를 찾을 수 없으며, 브라우저에서는 알려지지 않은 URL을 의미함.
        5. 서버 에러 응답 :
            1. `500 Internal Server Error` : 서버가 처리 방법을 모르는 상황.
            2. `501 Not Implemented` : 요청 방법은 서버에서 지원되지 않으므로 처리할 수 없음.
            3. `502 Bad Gateway` : 서버가 요청을 처리하는 데 필요한 응답을 얻기 위해 게이트웨이로 작업하는 동안 잘못된 응답을 수신했음을 의미.
    - 상태 코드 정의 링크 :
        
        https://datatracker.ietf.org/doc/html/rfc2616#section-10
        

## 🧩 요약 정리

1. Express 미들웨어를 사용해 API를 요청했을 때 오류 응답에 대한 메세지를 통일할 수 있도록 함수를 선언하였다.
    
    → 공통 응답을 사용할 수 있도록 하는 헬퍼 함수, 이를 전역 처리하기 위한 미들웨어 선언
    
    → `resultType`(성공/실패 여부), `error`(`errorcode`, `reason`, `data`)(에러 코드, 에러 이유, 추가 데이터), `success`(성공/실패 여부에 따른 데이터 유무)
    

## ✅ 실습 체크리스트

- [x]  회원 가입 시 에러 처리하기 - API 응답 통일

## ☑️ 실습 인증

<aside>
💡

웹 브라우저, IDE(VSCode 편집기) 및 터미널 이미지(스크린샷), 설명 등을 자유롭게 남겨주세요. 실습을 진행한 과정이 순차적으로 잘 드러나면 가장 좋습니다.

</aside>

> **GitHub 저장소 주소**
> 
> 
> https://github.com/… (자신의 GitHub 저장소 주소를 입력해주세요.)
> 
1. 회원 가입 시 에러 처리하기 - API 응답 통일
    
    <img width="395" alt="회원가입 - 이메일 중복" src="https://github.com/user-attachments/assets/6ff733f0-e657-44c9-bcef-21274117af96" />

    
    ```jsx
    // 이메일 중복 확인
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email }
      });
    
      if (existingUser) {
        throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
      }
    ```
    
    > `user.controller.js` 파일에 위 구문 추가. (함수 및 객체 선언은 워크북 본문과 동일)
    > 
    
    → DB에서 `email` 컬럼을 `unique` 설정했기 때문에 이에 대한 검색 구문이 따로 필요하다. 따라서 `existngUser`를 선언하여 이를 처리하였다.
    
## 💪 미션 기록

- 미션 기록
    
    ```jsx
    try { //...
    			res.status(StatusCodes.OK).success({
          resultType: "SUCCESS",
          message: null,
          data: {data},
        });
     } catch (error){
       return next(error);
    ```
    
    > `controller.js` 파일에서 응답을 통일하기 위해 위와 같이 선언하였다. 성공할 경우, 메시지를 반환하고 그렇지 못할 경우, `next` 미들웨어로 전달, `errors.js`에 선언된 함수를 통해 에러 이유를 반환한다.
    > 
    
    ```jsx
    // 이메일 중복
    export class DuplicateUserEmailError extends Error {
        errorCode = "U001";
    
        constructor(reason, data) {
            super(reason);
            this.reason = reason;
            this.data = data;
        }
    }
    
    // 가게 존재 x
    export class DuplicateStoreExist extends Error {
        errorCode = "S001";
    
        constructor(reason, data) {
            super(reason);
            this.reason = reason;
            this.data = data;
        }
    }
    
    // 사용자 존재 x
    export class DuplicateUserExist extends Error {
        errorCode = "U002";
    
        constructor(reason, data) {
            super(reason);
            this.reason = reason;
            this.data = data;
        }
    }
    
    // 리뷰 존재 x
    export class DuplicateReviewExist extends Error {
        errorCode = "R001";
    
        constructor(reason, data) {
            super(reason);
            this.reason = reason;
            this.data = data;
        }
    }
    
    // 지역 존재 x
    export class DuplicateRegionExist extends Error {
        errorCode = "RE001";
    
        constructor(reason, data) {
            super(reason);
            this.reason = reason;
            this.data = data;
        }
    }
    
    // 미션 존재 x
    export class DuplicateMissionExist extends Error {
        errorCode = "M001";
    
        constructor(reason, data) {
            super(reason);
            this.reason = reason;
            this.data = data;
        }
    }
    ```
    
    > `erros.js` 파일에 에러 판별을 위한 함수들을 선언하였다.
    > 
    
    ---
    
    - 가게 관련 API
        
        > 가게 관련 API의 경우, `store_id`를 URL로 받아 파라미터로 사용했기 때문에 존재 여부에 관한 에러 처리가 필요하다.
        > 
        
        → URL로 받은 `store_id`가 `store` 테이블에 존재하지 않으면 `FAIL` 응답 반환.
        
        ```jsx
        // 가게가 존재하는지 확인
        export const checkStoreExists = async (store_id) => {
          const existingStore = await prisma.store.findMany({
              where: { store_id }
          });
        
          if (!existingStore) {
              throw new DuplicateStoreExist("존재하지 않는 가게입니다.", { store_id });
          }
        
          return existingStore;
        };
        ```
        
        > `service.s`  파일에 URL로 받은 `store_id`가 `store`테이블에 존재하는지 확인하고, 존재하지 않으면 오류 응답을 반환하는 함수 `checkStoreExists` 선언
        > 
        
        ```jsx
        await checkStoreExists(store_id);
        ```
        
        > `controller.js` 파일에서 가게가 존재하는지 확인하는 함수 `checkStoreExists` 호출.
        > 
        
        - postman 화면
            - 가게 미션 조회 API
                
                <img width="592" alt="가게 미션 조회 성공" src="https://github.com/user-attachments/assets/080e6941-ca22-4715-ae8c-22727b2405a1" />

                
                > 성공
                > 
                
                <img width="340" alt="가게 미션 조회 - 가게 x" src="https://github.com/user-attachments/assets/a25742da-819d-4b17-99d9-31a89ea3232b" />

                
                > 실패
                > 
                
            - 가게 리뷰 조회 API
                
                <img width="538" alt="가게 리뷰 조회 성공" src="https://github.com/user-attachments/assets/eb555ccd-c010-44d4-865a-62666e9c9350" />

                
                > 성공
                > 
                
                <img width="343" alt="가게 리뷰 조회 - 가게 x" src="https://github.com/user-attachments/assets/1af24c84-bd3a-4b10-99be-2df2a1af5e8b" />

                
                > 실패
                > 
                
            - 가게 미션 추가 API
                
                <img width="439" alt="가게 미션 추가 성공" src="https://github.com/user-attachments/assets/e4aa4883-f32f-4daa-957a-dca03b27ef33" />

                
                > 성공
                > 
                
                <img width="348" alt="가게 미션 추가 - 가게 x" src="https://github.com/user-attachments/assets/697aa4e6-77cc-4c6d-91fd-67984134c50b" />

                
                > 실패
                > 
                
            - 가게 리뷰 추가 API
                
                <img width="536" alt="가게 리뷰 추가 성공" src="https://github.com/user-attachments/assets/41b1ab51-2bae-41f4-b213-51edd0f718e8" />

                
                > 성공
                > 
                
                <img width="398" alt="가게 리뷰 추가 - 사용자 x" src="https://github.com/user-attachments/assets/caebac08-ac0c-4e1a-a0c2-0ee9f1b897db" />

                
                > 실패 - 사용자 존재 x
                > 
                
                → 코드는 사용자 관련 API 토글 참조
                
                <img width="340" alt="가게 미션 조회 - 가게 x" src="https://github.com/user-attachments/assets/501e1095-1693-4f2b-801d-2f9753a24b54" />

                
                > 실패 - 가게 존재 x
                > 
                
                → 위 API의 경우, URL로 `store_id`와 `user_id`를 모두 받으므로 두 파라미터가 존재하지 않을 경우 모두를 설정하였다.
                
        
    - 사용자 관련 API
        
        > 사용자 관련 API의 경우, `user_id`를 URL로 받아 파라미터로 사용했기 때문에 존재 여부에 관한 에러 처리가 필요하다.
        > 
        
        → URL로 받은 `user_id`가 `user` 테이블에 존재하지 않으면 `FAIL` 응답 반환.
        
        ```jsx
        // 가게가 존재하는지 확인
        export const checkUserExists = async (user_id) => {
          const existingUser = await prisma.user.findUnique({
              where: { user_id }
          });
        
          if (!existingUser) {
              throw new DuplicateStoreExist("존재하지 않는 사용자입니다.", { User_id });
          }
        
          return existingUser;
        };
        ```
        
        > `service.s`  파일에 URL로 받은 `user_id`가 `user`테이블에 존재하는지 확인하고, 존재하지 않으면 오류 응답을 반환하는 함수 `checkUserExists` 선언
        > 
        
        ```jsx
        await checkuserExists(user_id);
        ```
        
        > `controller.js` 파일에서 가게가 존재하는지 확인하는 함수 `checkUserExists` 호출.
        > 
        
        - postman 화면
            - 사용자 리뷰 조회 API
                
                <img width="610" alt="사용자 리뷰 조회 성공" src="https://github.com/user-attachments/assets/67dfea1a-d863-4404-90cb-2bcfbe9b77e2" />


                
                > 성공
                > 
                
                <img width="351" alt="사용자 리뷰 조회 - 사용자 x" src="https://github.com/user-attachments/assets/dd34c669-d5f1-4bb0-a269-68d8185771c6" />

                
                > 실패
                > 
                
            - 사용자 도전 중 미션 조회 API
                
                <img width="509" alt="미션 조회 성공" src="https://github.com/user-attachments/assets/b118ef37-65f6-4eae-861b-4693ce8791cb" />

                
                > 성공
                > 
                
                <img width="359" alt="미션 조회 - 사용자 x" src="https://github.com/user-attachments/assets/fc8d86a0-af6a-42bc-9652-0ea738cfdcbb" />

                
                > 실패
                > 
                
            - 사용자 도전 중 미션 추가 API
                
                <img width="395" alt="사용자 미션 추가 성공" src="https://github.com/user-attachments/assets/84f11269-a3b3-4362-a202-b8bcd50c2cac" />

                
                > 성공
                > 
                
                <img width="363" alt="사용자 미션 추가 - 사용자 x" src="https://github.com/user-attachments/assets/252b9e4d-956c-4583-8d3b-6a22d27f9c0b" />

                
                > 실패
                > 
                
            - 사용자 미션 상태 업데이트 API
                
                <img width="286" alt="미션 상태 업데이트 성공" src="https://github.com/user-attachments/assets/4925cb7a-d7b2-4ade-a297-631c7279a600" />

                
                > 성공
                > 
                
                <img width="346" alt="미션 상태 업데이트 - 사용자 x" src="https://github.com/user-attachments/assets/1fdbaada-591e-4f14-b02e-5506d486a377" />

                
                > 실패 - 사용자 x
                > 
                
                <img width="350" alt="미션 상태 업데이트 - 미션 x" src="https://github.com/user-attachments/assets/30c38f24-971f-4702-b48f-b2b52bd06120" />

                
                > 실패 - 미션 x
                > 
                
                → 위 API의 경우, URL로 `mission_id`와 `user_id`를 모두 받으므로 두 파라미터가 존재하지 않을 경우 모두를 설정하였다.
                
    - 지역 관련 API
        
        > 지역 관련 API의 경우, `region_id`를 URL로 받아 파라미터로 사용했기 때문에 존재 여부에 관한 에러 처리가 필요하다.
        > 
        
        → URL로 받은 `region_id`가 `region` 테이블에 존재하지 않으면 `FAIL` 응답 반환.
        
        ```jsx
        // 지역이 존재하는지 확인
        export const checkRegionExists = async (region_id) => {
          const existingRegion = await prisma.regiion.findUnique({
              where: { region_id }
          });
        
          if (!existingRegion) {
              throw new DuplicateRegionExist("존재하지 않는 지역입니다.", { region_id });
          }
        
          return existingRegion;
        };
        ```
        
        > `service.s`  파일에 URL로 받은 `region_id`가 r`egion`테이블에 존재하는지 확인하고, 존재하지 않으면 오류 응답을 반환하는 함수 `checkRegionExists` 선언
        > 
        
        ```jsx
        await checkRegionExists(region_id);
        ```
        
        > `controller.js` 파일에서 가게가 존재하는지 확인하는 함수 `checkRegionExists` 호출.
        > 
        
        - postman 화면
            - 지역에 가게 추가 API
                
                <img width="398" alt="가게 추가 성공" src="https://github.com/user-attachments/assets/537c1c64-7587-44a3-8fe1-b2120434d3c9" />

                
                > 성공
                > 
                
                <img width="344" alt="가게 추가 - 지역 존재 x" src="https://github.com/user-attachments/assets/4fdff112-5526-4369-94ba-d7afd65c1e29" />

                
                > 실패
                > 
        
    - 리뷰 관련 API
        
        > 리뷰 관련 API의 경우, `review_id`를 URL로 받아 파라미터로 사용했기 때문에 존재 여부에 관한 에러 처리가 필요하다.
        > 
        
        → URL로 받은 `review_id`가 `review` 테이블에 존재하지 않으면 `FAIL` 응답 반환.
        
        ```jsx
        // 리뷰가 존재하는지 확인
        export const checkReviewExists = async (review_id) => {
          const existingReview = await prisma.review.findUnique({
              where: { review_id }
          });
        
          if (!existingReview) {
              throw new DuplicateReviewExist("존재하지 않는 리뷰입니다.", { Review_id });
          }
        
          return existingReview;
        };
        ```
        
        > `service.s`  파일에 URL로 받은 `review_id`가 `review`테이블에 존재하는지 확인하고, 존재하지 않으면 오류 응답을 반환하는 함수 `checkReviewExists` 선언
        > 
        
        ```jsx
        await checkReviewExists(review_id);
        ```
        
        > `controller.js` 파일에서 가게가 존재하는지 확인하는 함수 `checkReviewExists` 호출.
        > 
        
        - postman 화면
            - 리뷰 이미지 추가 API
                
                <img width="501" alt="리뷰 이미지 추가 성공" src="https://github.com/user-attachments/assets/041efc37-20c7-42c8-8cad-25a28cf73e46" />

                
                > 성공
                > 
                
                <img width="373" alt="리뷰 이미지 추가 - 존재 x" src="https://github.com/user-attachments/assets/a4f0e927-aa98-43e8-82e7-7f26a0e06a68" />

                
                > 실패
                > 
    
