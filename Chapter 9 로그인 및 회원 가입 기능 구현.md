## 🎯 핵심 키워드

- OAuth 2.0
    - 웹 및 어플리케이션에서의 업계 개방형 표준 권한 부여 프로토콜
    - 웹 어플리케이션, 데스크톱 어플리케이션, 기기 등에 대한 구체적인 권한 부여 흐름을 제공하는 동시에 클라이언트 개발자의 편의성에 중점을 둠.
    - IETF OAuth 워킹 그룹에서 개발되고 있음.
    - <역할>
    1. 리소스 소유자 : 프로토콜을 사용하여 보호되는 리소스에 대한 액세스 권한을 부여하는 사용자(Entity).
    2. 클라이언트 : 리소스에 접근하려는 third-party 애플리케이션
    3. 권한 서버 : 클라이언트가 소유자의 권한을 얻을 수 있도록 도와주는 서버.
    4. 리소스 서버 : 보호되는 리소스를 호스팅하는 서버로 액세스를 허용하거나 거부함.
    - <권한 부여 과정>
    1. 인증 코드 요청 : 클라리언트가 사전에 권한 서버로부터 발급한 클라이언트 ID, redirect_url 정보와 함께 response_type을 code로 지정하여 요청함.
    2. 로그인 : 권한 서버에서 로그인 페이지를 제공하고 리소스 소유자가 로그인함.
    3. 인증 코드 전달 : 로그인에 성공하면 권한 서버는 전달받은 redirect_url로 인증 코드를 전달함.
    4. Access Token 발급 : 클라이언트가 권한 부여 승인 코드를 통해 Access Token 및 Refresh Token을 발급받음. 이 때, 사전에 권한 서버로부터 발급한 클라이언트 ID와 클라이언트 시크릿 정보가 필요함.
    - <프레임 워크>
    1. <Access Token>
        - OAuth 클라이언트가 리소스 서버에 요청을 보내는 데 사용하는 문자열
        - <주의사항>
            1. OAuth 클라이언트는 토큰의 대상이 아님.
        1. 신원이나 사용자에 대한 기타 정보를 OAuth 클라이언트에 전달하지 않음.
        2. 리소스 서버에 요청을 보내는 데에만 사용해야 함.
    2. <Refresh Token>
        - OAuth 클라이언트가 사용자의 상호 작용 없이 새로운 액세스 토큰을 얻는 데 사용할 수 있는 문자열.
        - 공개 클라이언트에 발급된 토큰이 도난당하면 공격자는 해당 클라이언트를 사칭하여 발각되지 않고 Refresh Token을 사용할 수 있음.
        - DPoP를 사용하여 공개 클라이언트 인스턴스에 토큰을 바인딩, 공격 방어가 가능함.
        - 권한 부여 서버가 토큰 만료 시 사용자를 개입시키지 않고도 짧은 유효 기간을 사용할 수 있도록 하기 위해 존재함.
- HTTP Cookie
    - 사용자가 웹 사이트를 탐색하는 동안 웹 서버가 생성하여 사용자의 웹 브라우저를 통해 사용자의 컴퓨터 또는 기타 기기에 저장하는 작은 데이터 블록.
    - 웹사이트 접속에 사용되는 기기에 저장되며, 세션 동안 사용자의 기기에 여러 개의 쿠키가 저장될 수 있음.
    - <기능>
        1. 웹 서버가 상태 정보를 사용자 기기에 저장하거나 사용자의 탐색 활동 추적 가능.
        2. 이름, 주소, 비밀번호 등 사용자가 이전에 양식 필드에 입력한 정보를 저장하여 나중에 사용할 수 있도록 함.
    - <종류>
        1. 인증 쿠키 : 웹 서버에서 사용자가 로그인했는지, 어떤 계정으로 로그인했는지 인증하는 데 사용. 보안 취약점으로 인해 공격자가 쿠키 데이터를 읽거나, 사용자 데이터에 엑세스하거나, 쿠키가 속한 웹사이트에 액세스하는 데 사용될 수 있음.
        2. 추적 쿠키 : 일반적으로 개인의 검색 기록에 대한 장기 기록을 수집하는 방법으로 사용됨. 유럽 법률에 따라 유럽 연합 회원국을 타겟으로 하는 모든 웹사이트는 사용자의 장치에 필수적이지 않은 쿠키를 저장하기 전에 사용자의 '정보에 입각한 동의'를 받아야 함.

## 🧩 요약 정리

1. Passport 라이브러리를 활용, 인증을 처리함.
2. Goggle 서버에 key를 등록하여 로그인 인증.
3. OAuth 2.0을 활용하여 google에 저장되어 있는 email, 프로필 사진 등의 정보를 불러오고 이를 Passport와 Session 라이브러리를 이용해서 정보를 저장, 불러올 수 있게 함.

## ✅ 실습 체크리스트

1. Google 연동 로그인 및 회원가입 기능 구현하기

## ☑️ 실습 인증

1. Google 연동 로그인 및 회원가입 기능 구현하기

/Users/kimminji/Desktop/session db.png

> session 테이블에 값이 잘 저장되었다.
> 

```jsx
{"cookie":{"originalMaxAge":604800000,"expires":"2025-06-05T10:26:45.746Z","httpOnly":true,"path":"/"},"messages":["Unable to verify authorization request state."]}
```

> data에 저장된 cookie 확인 결과, authorization request state에 문제가 있고, 원하는 data(email, profile)의 정보가 누락되었다.
> 

⇒ 해결하지 못하였다.

## 🔥 미션
## 💪 미션 기록

- 미션 기록
    - Naver 로그인 연동 구현
        1. Naver Developer 를 이용하여 client 추가
        
    - 회원가입 API 수정 → google, naver로 로그인한 사용자의 경우, 사용자 정보 추가 수정 갱신(임시)
        
        <aside>
        🔑
        
        POST /api/v1/add/complete/profile
        
        </aside>
        
        ```jsx
        // 연동 로그인 시 사용자 정보 추가
        export const completeUserProfile = async (req, res, next) => {
          try {
            const userId = req.user?.id; // Passport 인증된 사용자 ID
            
            await checkUserExists(userId);
        
            const userData = completeProfileDTO(req.body);
        
            const updatedUser = await updateUserProfile(userId, userData);
        
            return res.status(StatusCodes.OK).success({
              resultType: "SUCCESS",
              message: null,
              data: updatedUser,
            });
          } catch (error) {
            return next(error);
          }
        };
        ```
        
        `user.controller.js` 
        
        ```jsx
        export const completeProfileDTO = (body) => {
          return {
            nickname: body.nickname,
            gender: body.gender,
            birth: new Date(body.birth),
            address: body.address,
            phone_number: body.phone_number,
            is_phone_verified: body.is_phone_verified,
          };
        };
        ```
        
        `user.dto.js` 
        
        ```jsx
        export const updateUserProfile = async (userId, data) => {
          await checkUserNicknameExists(data.nickname);
        
          const updated = await updateUserById(userId, {
            ...data,
            updated_at: new Date(),
          });
        
          return {
            user_id: updated.user_id,
            email: updated.email,
            name: updated.name,
            nickname: updated.nickname,
            gender: updated.gender,
            phone_number: updated.phone_number,
            birth: updated.birth,
          };
        };
        ```
        
        `user.service.js` 
        
        ```jsx
        export const updateUserById = async (userId, data) => {
          return await prisma.user.update({
            where: { user_id: userId },
            data,
          });
        };
        ```
        
        `user.repository.js`
        
    

## ⚡ 트러블 슈팅

- ⚡ No.1
    
    **`이슈`**
    
    /Users/kimminji/Desktop/issue 1_problem.png
    
    👉 url에서 화면과 같은 error message가 출력되었다.
    
    **`문제`**
    
    ```
    //공통 응답을 사용할 수 있는 헬퍼 함수 등록
    app.use((req, res, next) => {
      res.success = (success) => {
        return res.json({resultType: "SUCCESS", error: null, success});
      };
    
      res.error = ({errorCode = "unknown", reason = null, data = null}) => {
        return res.json({
          resultType: "FAIL",
          error: {errorCode, reason, data},
          success: null,
        });
      };
    
      next();
    });
    ```
    
    👉 헬퍼 함수가 라우트보다 먼저 정의되었기 때문.
    
    **`해결`**
    
    👉  `index.js` 파일의 순서를 재배치하여 해결하였고 자동으로 로그인 화면으로 전환되었다.
    
    ![issue 1.png](Chapter%209%20%E1%84%85%E1%85%A9%E1%84%80%E1%85%B3%E1%84%8B%E1%85%B5%E1%86%AB%20%E1%84%86%E1%85%B5%E1%86%BE%20%E1%84%92%E1%85%AC%E1%84%8B%E1%85%AF%E1%86%AB%20%E1%84%80%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%B8%20%E1%84%80%E1%85%B5%E1%84%82%E1%85%B3%E1%86%BC%20%E1%84%80%E1%85%AE%E1%84%92%E1%85%A7%E1%86%AB%201fdb57f4596b80628c57f329e8f9f5cf/issue_1.png)
    
    **`참고 레퍼런스`**
    
    - 링크
- ⚡ No. 2
    
    **`이슈`**
    
    👉 동일한 계정으로 로그인을 시도해도 id가 만들어지고(session table에 저장됨.) 정보 저장이 누락되는 상황이 발생하였다.
    
    ```jsx
    {"cookie":{"originalMaxAge":604800000,"expires":"2025-06-05T06:09:06.623Z","httpOnly":true,"path":"/"},"messages":["Unable to verify authorization request state."]}
    ```
    
    **`문제`**
    
    👉 로그인은 정상적으로 되었지만 `callback` 시 세션이 끊겨 올바른 정보를 받지 못한 상태.
    
    **`해결`**
    
    👉  `auth.config.js` 파일에 오류 확인을 위한 출력 코드 추가
    
    ```jsx
    export const googleStrategy = new GoogleStrategy(
        {
          clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
          clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
          callbackURL: "http://localhost:3000/oauth2/callback/google",
          scope: ["email", "profile"],
          state: true,
        },
        (accessToken, refreshToken, profile, cb) => {
          console.log("Google profile:", profile) // 오류 검증을 위해 추가한 코드
          return googleVerify(profile)
          .then((user) => cb(null, user))
          .catch((err) => cb(err));
        }
      );  
    ```
    
    → 해결되지 않았음.