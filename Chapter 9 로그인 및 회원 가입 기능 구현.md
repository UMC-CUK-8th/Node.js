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

/Users/kimminji/Desktop/UMC/Chapter/#9/session db.png

> session 테이블에 값이 잘 저장되었다.
> 

```jsx
{"cookie":{"originalMaxAge":604800000,"expires":"2025-06-07T05:08:11.692Z","httpOnly":true,"path":"/"},"passport":{"user":{"email":"kimminji3522@gmail.com","name":"김민지"}}}
```

> data에 저장된 cookie 확인 결과, authorization request state에 문제가 있고, 원하는 data(email, profile)의 정보가 누락되었다.
> 

⇒ googleVerify의 함수와 user 테이블의 형태 및 조건이 맞지 않았다. 따라서 googleVerify를 수정하였다.

```jsx
 const created = await prisma.user.create({
      data: {
        email,
        name: profile.displayName,
        sns_id: profile.id,
        sns_provider: "google", 
        gender: "none", // 기본값 설정
        birth: new Date(1970, 0, 1),
        profile_image_url: profile.photos?.[0]?.value || '',
        address: "추후 수정",
        phone_number: "추후 수정",
        nickname: "추후 수정",
      },
    });
```

```jsx
{"cookie":{"originalMaxAge":604800000,"expires":"2025-06-07T05:08:11.692Z","httpOnly":true,"path":"/"},"passport":{"user":{"email":"kimminji3522@gmail.com","name":"김민지"}}}
```

> 정상적으로 data가 저장되는 것을 확인할 수 있다.
> 

## 💪 미션 기록

- 미션 기록
    - Naver 로그인 연동 구현
        1. Naver Developer를 이용하여 client 추가
        
        ![alt text](<naver client-1.png>)
        
        2. API 설정
        
        ![alt text](<naver API 설정.png>)
        
        3. Passport 라이브러리 다운로드
        
        ```jsx
        npm install passport-naver-v2
        ```
        
        4. 코드 작성 - google 로그인 코드를 변형하여 naver 연동 로그인으로 바꿔주었다.
        
        ```jsx
        // OAuth Naver 로그인 라우트
        app.get("/oauth2/login/naver", passport.authenticate("naver"));
        app.get(
          "/oauth2/callback/naver",
          passport.authenticate("naver", {
            failureRedirect: "/oauth2/login/naver",
            failureMessage: true,
          }),
          (req, res) => {
            return res.redirect("/");
          }
        );
        ```
        
        > `index.jx`
        > 
        
        ```jsx
        
          export const naverStrategy = new NaverStrategy(
            {
              clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
              clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
              callbackURL: "http://localhost:3000/oauth2/callback/naver",
              scope: ["email", "profile"],
              state: true,
            },
            async (accessToken, refreshToken, profile, cb) => {
              console.log("Naver profile:", profile) // 오류 검증
        
              return naverVerify(profile)
              .then((user) => cb(null, user))
              .catch((err) => cb(err));
            }
          );  
        
          const naverVerify = async (profile) => {
            const response = profile._json?.response ?? profile.response;
          
            const email = response?.email;
            if (!email) {
              throw new Error(`profile.email was not found: ${JSON.stringify(profile)}`);
            }
          
            const user = await prisma.user.findFirst({ where: { email } });
            if (user != null) {
              return { id: user.user_id, email: user.email, name: user.nickname };
            }
          
            const created = await prisma.user.create({
              data: {
                email,
                name: response.name,
                nickname: response.nickname,
                sns_id: response.id,
                sns_provider: "naver",
                gender: response.gender === "F" ? "female" : "male", // prisma에 맞춰서
                birth: new Date(1970, 0, 1), 
                profile_image_url: response.profile_image || '',
                address: "추후 수정",
                phone_number: "추후 수정",
                nickname: response.nickname || "추후 수정",
              },
            });
          
            return { id: created.id, email: created.email, name: created.name };
          };  
        ```
        
        > `auth.config.js`
        > 
        
        5. session / user 테이블에 값이 잘 저장되는지 확인.
        
        ![alt text](session.png)
        
        > data에 사용자 정보가 함께 저장되었다.
        > 
        
        ![alt text](<user .png>)
        
        > user 테이블에 google / naver 로그인을 통해 회원가입한 사용자의 정보가 저장되었다.
        > 
    - 회원가입 관련 API 추가 → 사용자 정보 추가 수정 갱신
        
        <aside>
        🔑
        
        PUT /api/v1/add/complete/profile/{user_id}
        
        </aside>
        
        > 업데이트 형식을 이용, method를 `PUT`으로 하고 `user_id`를 파라미터로 사용하였다.
        > 
        
        ```jsx
        export const completeUserProfile = async (req, res, next) => {
          try {
            const userId = parseInt(req.params.user_id); 
            
            await checkUserExists(userId); // 사용자 존재 여부 확인
        
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
        /* 
           #swagger.summary = '사용자 정보 추가 API';
           #swagger.parameters['user_id'] = {
              description: "조회할 사용자의 ID",
              required: true,
              type: "integer",
              in: "path"
           }
           #swagger.responses[200] = {
             description: "사용자 정보 추가 성공 응답",
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
             description: "사용자 정보 추가 실패 응답 - 사용자 존재 x",
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
             #swagger.responses[405] = {
             description: "사용자 정보 추가 실패 응답 - 닉네임 중복",
             content: {
               "application/json": {
                 schema: {
                   type: "object",
                   properties: {
                     resultType: {type: "string", example: "FAIL"},
                     error: {
                       type: "object",
                       properties: {
                         errorCode: {type: "string", example: "U003"},
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
        
        > `swagger`
        > 
        
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
        
          await checkUserNicknameExists(data.nickname); // 닉네임 중복 확인
        
          const updated = await updateUserById(userId, {
            ...data,
            updated_at: new Date(),
          });
        
          return {
            nickname: updated.nickname,
            gender: updated.gender,
            phone_number: updated.phone_number,
            birth: updated.birth,
            address: updated.address,
            is_phone_verified: updated.is_phone_verified,
          };
        };
        ```
        
        `user.service.js` 
        
        ```jsx
        export const updateUserById = async (userId, data) => {
          return await prisma.user.update({
            where: { user_id: userId },
            data
          });
        };
        ```
        
        `user.repository.js`
        
        ![alt text](성공화면.png)
        
        > 정보 추가 성공 화면
        > 
        
        ![alt text](<사용자 존재 x.png>)
        
        > 사용자 존재 x 오류 메세지
        > 
        
        ![alt text](실패화면.png)
        
        > 닉네임 중복 오류 메세지
        > 
        
        ![alt text](<user db.png>)
        
        > 추가 정보가 `user` 테이블에 잘 저장되었다.
        > 

## ⚡ 트러블 슈팅

- ⚡ No.1
    
    **`이슈`**
    
    ![alt text](<issue 1_problem.png>)
    
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
    
    👉  `index.js` 파일의 순서를 재배치하여 해결하였고 로그인 화면으로 전환되었다.
    
    ![alt text](<issue 1_solv.png>)
    
    **`참고 레퍼런스`**
    
    - 링크
- ⚡ No.2
    
    **`이슈`**
    
    👉 session 테이블의 data에 회원 정보가 누락되어 cookie가 저장, 원래 화면으로 돌아오지 않았다.
    
    **`문제`**
    
    👉 `googleVerify` 함수와 내가 설정한 `user` 테이블의 형태가 맞지 않았다.
    
    **`해결`**
    
    👉  `googleVerify` 함수를 수정하여 나의 `user` 테이블과 일치시켰다.
    
    ```jsx
     const created = await prisma.user.create({
          data: {
            email,
            name: profile.displayName,
            sns_id: profile.id,
            sns_provider: "google", 
            gender: "none", // 기본값 설정
            birth: new Date(1970, 0, 1),
            profile_image_url: profile.photos?.[0]?.value || '',
            address: "추후 수정",
            phone_number: "추후 수정",
            nickname: "추후 수정",
          },
        });
    ```