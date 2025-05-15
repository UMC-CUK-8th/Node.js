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

1. 회원 가입 시 에러 처리하기 - API 응답 통일
    
    <img width="691" alt="API 응답 통일 - 회원가입" src="https://github.com/user-attachments/assets/b9b62979-f421-4e7a-8c26-fc8a88e88664" />

    
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
    
    > 가게 관련 API의 경우, `store_id`를 URL로 받아 파라미터로 사용했기 때문에 존재 여부에 관한 에러 처리가 필요하다.
    > 
    
    - 가게의 미션 조회 API
        
        에러 1 : 조회하려고 하는 미션을 보유한 가게가 존재하지 않을 경우.
        
        → URL로 받은 `store_id`가 `store` 테이블에 존재하지 않으면 `FAIL` 응답 반환.
        
        ```jsx
        // 가게가 존재하는지 확인
        export const checkStoreExists = async (store_id) => {
            const existingStore = await prisma.store.findMany({
                where: { store_id }
            });
        
            if (!existingStore.length) {
                throw new DuplicateStoreExist("존재하지 않는 가게입니다.", { store_id });
            }
        
            return existingStore[0];
        };
        ```
        
        > `getmission.service.js`  파일에 URL로 받은 `store_id`가 `store`테이블에 존재하는지 확인하고, 존재하지 않으면 오류 응답을 반환하는 함수 `checkStoreExists` 선언
        > 
        
        ```jsx
        // 가게가 존재하는지 확인
                try {
                    const store = await checkStoreExists(storeId);
                    res.status(StatusCodes.OK).success({
                        message: "가게 미션 목록 조회 성공",
                        data: reviews.map(responseFromMission),
                    });
                } catch (error) {
                    return next(error);
                }
        ```
        
        > `getmission.controller.js`  파일에 가게 존재 여부를 확인하는 함수 `checkStoreExists` 호출, 에러가 발생한 경우 `next`를 통해 미들웨어로 전달.
        > 
        
        <img width="576" alt="가게 미션 조회 성공" src="https://github.com/user-attachments/assets/7013a001-6333-4e90-bcac-6acdb28354ee" />

        
        > postman 성공 응답
        > 
        
        <img width="357" alt="가게 존재 x" src="https://github.com/user-attachments/assets/fac809a0-47f8-4f17-8c6c-18f01917655b" />

        
        > postman 실패 응답
        > 
        
    - 가게의 리뷰 조회 API
        
        에러 1 : 조회하려고 하는 미션을 보유한 가게가 존재하지 않을 경우.
        
        → URL로 받은 `store_id`가 `store` 테이블에 존재하지 않으면 `FAIL` 응답 반환.
        
        → 앞서 한 “가게의 미션 조회 API” 에러 처리와 동일한 에러이므로 동일하게 진행했다.
        
        ```jsx
        // 가게가 존재하는지 확인
        export const checkStoreExists = async (store_id) => {
            const existingStore = await prisma.store.findMany({
                where: { store_id }
            });
        
            if (!existingStore.length) {
                throw new DuplicateStoreExist("존재하지 않는 가게입니다.", { store_id });
            }
        
            return existingStore[0];
        };
        ```
        
        > `getreview.service.js`  파일에 URL로 받은 `store_id`가 `store`테이블에 존재하는지 확인하고, 존재하지 않으면 오류 응답을 반환하는 함수 `checkStoreExists` 선언
        > 
        
        ```jsx
        // 가게가 존재하는지 확인
                        try {
                            const store = await checkStoreExists(storeId);
                            res.status(StatusCodes.OK).success({
                                message: "가게 리뷰 목록 조회 성공",
                                data: reviews.map(responseFromReview),
                            });
                        } catch (error) {
                            return next(error);
                        }
        ```
        
        > `getreview.controller.js`  파일에 가게 존재 여부를 확인하는 함수 `checkStoreExists` 호출, 에러가 발생한 경우 `next`를 통해 미들웨어로 전달.
        > 
        
        <img width="648" alt="가게 리뷰 조회 성공" src="https://github.com/user-attachments/assets/f13f102e-73a4-422f-a26f-786d5877f5d4" />

        
        > postman 성공 응답
        > 
        
        <img width="357" alt="가게 존재 x" src="https://github.com/user-attachments/assets/9c8c8399-c056-427c-a4fd-2b0d8a98e8b0" />

        
        > postman 실패 응답
        > 
        
    - 가게에 미션 추가 API
        
        에러 1 : 추가하려고 하는 미션을 보유한 가게가 존재하지 않을 경우.
        
        → URL로 받은 `store_id`가 `store` 테이블에 존재하지 않으면 `FAIL` 응답 반환.
        
        → 앞서 한 “가게의 미션 조회 API” 에러 처리와 동일한 에러이므로 동일하게 진행했다.
        
        ```jsx
        // 가게가 존재하는지 확인
        export const checkStoreExists = async (store_id) => {
          const existingStore = await prisma.store.findMany({
              where: { store_id }
          });
        
          if (!existingStore.length) {
              throw new DuplicateStoreExist("존재하지 않는 가게입니다.", { store_id });
          }
        
          return existingStore[0];
        };
        ```
        
        > `mission.service.js`  파일에 URL로 받은 `store_id`가 `store`테이블에 존재하는지 확인하고, 존재하지 않으면 오류 응답을 반환하는 함수 `checkStoreExists` 선언
        > 
        
        ```jsx
        // 가게 존재 여부 확인
              try {
                  const store = await checkStoreExists(storeId);
                  res.status(StatusCodes.OK).success({
                      message: "가게 미션 목록 추가 성공",
                      data: newMission,
                  });
              } catch (error) {
                  return next(error);
              }
        ```
        
        > `mission.controller.js`  파일에 가게 존재 여부를 확인하는 함수 `checkStoreExists` 호출, 에러가 발생한 경우 `next`를 통해 미들웨어로 전달.
        > 
        
        <img width="453" alt="가게 미션 추가 성공" src="https://github.com/user-attachments/assets/0fd5a667-bc28-4a91-83d8-3642b157d44e" />

        
        > postman 성공 화면
        > 
        
        <img width="348" alt="가게 미션 추가 x" src="https://github.com/user-attachments/assets/d8cae116-6c2a-4144-8189-b80ff50ce1dd" />

        
        > postman 실패 화면
        > 
        
    
    > 사용자 관련 API의 경우, `user_id`를 URL로 받아 파라미터로 사용했기 때문에 존재 여부에 관한 에러 처리가 필요하다.
    > 
    
    - 사용자가 작성한 리뷰 조회 API
        
        에러 1 : 조회하려고 하는 리뷰를 작성한 사용자가 존재하지 않을 경우.
        
        → URL로 받은 `user_id`가 `user` 테이블에 존재하지 않으면 `FAIL` 응답 반환.
        
        → 앞서 구현한 API의 에러 처리를 변형하여 적용하였다.
        
        ```jsx
        // 사용자 존재 x
        export class DuplicateUserExist extends Error {
            errorCode = "U003";
        
            constructor(reason, data) {
                super(reason);
                this.reason = reason;
                this.data = data;
            }
        }
        ```
        
        > `errors.js` 파일에 사용자가 존재하지 않았을 경우 에러 응답을 표시하는 함수 정의
        > 
        
        ```jsx
        
        // 사용자가 존재하는지 확인하는 함수
        export const checkUserExists = async (user_id) => {
            const existingUser = await prisma.user.findMany({
                where: { user_id }
            });
        
            if (!existingUser.length) {
                throw new DuplicateUserExist ("존재하지 않는 사용자입니다.", { user_id });
            }
        
            return existingUser[0];
        };
        ```
        
        > `getuserreview.service.js`  파일에 URL로 받은 `user_id`가 `user`테이블에 존재하는지 확인하고, 존재하지 않으면 오류 응답을 반환하는 함수 `checkUserExists` 선언
        > 
        
        ```jsx
        // 사용자가 존재하는지 확인
                try {
                    const user = await checkUserExists(userId);
                    res.status(StatusCodes.OK).success({
                        message: "내가 작성한 리뷰 목록 조회 성공",
                        data: reviews,
                    });
                } catch (error) {
                    return next(error);
                }
        ```
        
        > `getuserreview.controller.js`  파일에 가게 존재 여부를 확인하는 함수 `checkUserExists` 호출, 에러가 발생한 경우 `next`를 통해 미들웨어로 전달.
        > 
        
        <img width="610" alt="사용자 리뷰 조회 성공" src="https://github.com/user-attachments/assets/0b658370-f2d1-41af-8bdb-38da7c0f04d6" />

        
        > postman 성공 화면
        > 
        
        <img width="453" alt="사용자 존재 x" src="https://github.com/user-attachments/assets/72a32db4-730b-41ec-88cd-96ddf3af0fe4" />

        
        > postman 실패 화면
        > 
