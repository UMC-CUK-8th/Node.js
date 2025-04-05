## 📢 학습 후기


💡 API 설계는 처음 해보는 것이라 공부해야할 부분이 많을 것 같지만 열심히 해보겠다.

</aside>

## ✅ 실습 체크리스트

---

- [x]  Node.js 설치
- [x]  Express 설치
- [x]  Express 서버 실행하기
- [ ]  Nodemon

## ☑️ 실습 인증

---

1. Node.js 설치

https://www.notion.so/makeus-challenge/Chapter-3-API-URL-1b7b57f4596b80beb693cd481eaa2b61?pvs=4#1cab57f4596b8012b732c22842e1c714

1. Express 설치

https://www.notion.so/makeus-challenge/Chapter-3-API-URL-1b7b57f4596b80beb693cd481eaa2b61?pvs=4#1cab57f4596b8028bce8ca5c179f2253

3. Express 서버 실행하기

https://www.notion.so/makeus-challenge/Chapter-3-API-URL-1b7b57f4596b80beb693cd481eaa2b61?pvs=4#1cab57f4596b809e8ec5d3fd58ef6e5e

https://www.notion.so/makeus-challenge/Chapter-3-API-URL-1b7b57f4596b80beb693cd481eaa2b61?pvs=4#1cab57f4596b80e78275d84aa3b5169c

4. Nodemon

https://www.notion.so/makeus-challenge/Chapter-3-API-URL-1b7b57f4596b80beb693cd481eaa2b61?pvs=4#1cab57f4596b80d39e45e68638139be2

→ 오류가 발생했고, 해결하지 못하였음.

## 🔥 미션

---

✉️ **홈 화면, 마이 페이지 리뷰 작성, 미션 목록 조회(진행중, 진행 완료), 미션 성공 누르기,
회원 가입 하기(소셜 로그인 고려 X)**

</aside>

위의 기능을 구현하는데 **필요한 API들을 설계**하여

<aside>
🌟 **API Endpoint, Request Body, Request Header, query String, Path variable**

</aside>

이 포함된 간단한 명세서를 만들기!

## 💪 미션 기록

---

</aside>

- **미션 기록**
    1. ***홈 화면 -> 내가 받은 미션, 지역, 지역별 성공 미션***
    
    **API Endpoint**
    
    <aside>
    🔑
    
    GET /user_mission/success_count?region_id={지역 id}
    
    </aside>
    
    → 로그인 된 사용자(user_id)와 연결된 mission 목록을 조회하되, ‘현재 위치한 지역에서’로 필터링하여 조회한다.
    
    <aside>
    🔑
    
    GET /user_mission/success_count?region_id={지역 id}&mission_status=completed
    
    </aside>
    
    → 지역 별 성공 미션의 개수를 표시하기 위해 현재 지역, 완료한 미션으로 필터링하여 개수를 count, 이를 조회한다.
    
    **Request Body**
    
    → 조회의 목적으로 ‘GET’ 메소드를 사용하였으므로 Request Body를 따로 작성하지 않아도 된다.
    
    **Request Header**
    
    ```jsx
    Authorization : Bearer <access_token>
    Content-Type : application/json
    Accept : application/json
    ```
    
    → 로그인된 사용자의 정보를 불러와야하므로 인증과 관련된 Authorization 헤더를 사용한다.
    
    → 클라이언트가 사용자에게 데이터를 전달해야하므로 Content-Type 헤더를 사용한다.
    
    → 클라이언트가 서버로부터 받을 응답의 데이터 형식을 나타내기 위해 Accept 헤더를 사용한다.
    
    **Query String**
    
    `completed`
    
    2. ***마이페이지 -> 내 정보 변경(닉네임, 이메일, 휴대 전화 번호), 작성한 리뷰 조회, 문의하기, 알림 설정, 로그아웃***
    
    **API Endpoint**
    
    <aside>
    🔑
    
    GET /user/user_point/{user_id}
    
    </aside>
    
    → 내 포인트를 조회하여 화면에 표시한다.
    
    <aside>
    🔑
    
    PATCH /user/nickname
    PATCH /user/email
    PATCH /user/phone_number
    PATCH /user/is_phone_verified
    
    </aside>
    
    → 닉네임, 이메일, 휴대 전화 번호 등 내 정보를 변경 가능하되, '휴대 전화 인증하기'를 위해 `is_phone_verifed` 정보 업데이트를 위한 항목을 추가하였다.
    
    <aside>
    🔑
    
    GET /review/user_id={user_id}
    
    </aside>
    
    → 사용자가 작성한 리뷰를 조회할 수 있게 GET을 사용하였다.
    
    <aside>
    🔑
    
    POST /qna
    
    </aside>
    
    → '문의하기'를 통해 문의를 바로 작성할 수 있으므로 리뷰를 작성하기 위해 POST를 사용하였다.
    
    <aside>
    🔑
    
    PATCH /notification/{user_id}
    
    </aside>
    
    → 알림을 설정할 수 있으나, 버튼을 통해 사용자가 상태를 업데이트할 수 있기 때문에 PATCH를 사용하였다.
    
    <aside>
    🔑
    
    PATCH /user
    
    </aside>
    
    → 로그 아웃을 요청한 사용자의 경우, 상태를 업데이트하는 것이기 때문에 PATCH를 사용하였다.
    
    **Request Body**
    
    ```jsx
    {
    “nickname” : “new_nickname”
    “phone_number” : “010-1234-5678”
    “email” : “new_email@example.com”
    }
    ```
    
    → 닉네임, 이메일, 전화 번호에 대한 정보 변경
    
    ```jsx
    {
    “qna_title” : “title”
    “type” : “포인트 관련 문의”
    “qna_content” : “포인트 적립이 되지 않습니다.”
    }
    ```
    
    → 문의 작성
    
    ```jsx
    {
    “new_event_notifications” : true
    “review_reply_notifications” : false
    “qna_reply_notifications” : true
    }
    ```
    
    → 새로운 이벤트 수신, 리뷰 답변 알림, 문의 내역 답변 알림에 대한 알림 설정
    
    **Request Header**
    
    ```jsx
    Authorization : Bearer <access_token>
    Content-Type : application/json
    Accept : application/json
    ```
    
    → 로그인된 사용자의 정보를 불러오고, 로그 아웃을 진행해야하므로 인증과 관련된 Authorization 헤더를 사용한다.
    
    → 클라이언트가 사용자에게 데이터를 전달해야하므로 Content-Type 헤더를 사용한다.
    
    → 클라이언트가 서버로부터 받을 응답의 데이터 형식을 나타내기 위해 Accept 헤더를 사용한다.
    
    **Query String**
    
    필요 없다.
    
    1. ***리뷰 작성 → 별점 설정 및 리뷰 내용 작성, 이미지 첨부***
    
    **API Endpoint**
    
    <aside>
    🔑
    
    POST /review
    
    </aside>
    
    → 리뷰를 새로 작성하는 것이므로 POST를 사용하였다.
    
    <aside>
    🔑
    
    POST /image_url/{review_id}
    
    </aside>
    
    → 리뷰 작성 시 함께 이미지를 첨부하는 것이므로 POST를 사용하였다.
    
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
    
    1. ***미션 목록 조회 -> 진행 중, 진행 완료인 미션 목록 조회***
    
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
    
    → 조회의 목적으로 ‘GET’ 메소드를 사용하였으므로 Request Body를 따로 작성하지 않아도 된다.
    
    **Request Header**
    
    ```jsx
    Authorization : Bearer <access_token>
    Accept : application/json
    ```
    
    **Query String**
    
    `in_progress`, `completed`
    
    1. ***미션 성공 누르기***
    
    **API Endpoint**
    
    <aside>
    🔑
    
    PATCH /user_mission/{user_id}/{mission_id}
    
    </aside>
    
    → 미션 성공 버튼을 누르면, 미션 상태가 완료로 업데이트 되어야한다. 따라서 PATCH 메소드를 사용해주었고, 미션과 사용자를 식별하기 위해 이를 파라미터 처리하였다.
    
    **Request Body**
    
    ```jsx
    {
    "mission_status" = "completed"
    }
    ```
    
    → 미션 성공 버튼을 누르면, 미션 상태가 완료로 업데이트 되어야한다. 따라서 `mission_status`를 데이터값 `completed`을 받아 이를 업데이트한다.
    
    **Request Header**
    
    ```jsx
    Authorization : Bearer <access_token>
    ```
    
    **Query String**
    필요 없다.
    
    1. ***회원 가입하기***
    
    **API Endpoint**
    
    <aside>
    🔑
    
    POST / user
    
    </aside>
    
    회원 가입의 경우, 사용자의 계정을 새로 생성하는 것이므로 POST를 사용하였다.
    
    **Request Body**
    
    ```jsx
    {
    “name” = “홍길동”
    “gender” = “Female”
    “birth” = “2003-01-25”
    “address” = “경기도 부천시 원미구 지봉로 43”
    “is_aggred” = “agree”
    }
    ```
    
    → 회원가입을 진행할 때에 입력하는 기본 정보를 담았다.
    
    <aside>
    🔑
    
    {
    “preference_name”= [
    “한식”,
    ”일식”,
    ”중식",
    "양식",
    "치킨",
    "분식",
    "고기/구이",
    "도시락",
    "야식(족발, 보쌈)",
    "패스트푸드",
    "디저트",
    "아시안푸드"
     ]
    }
    
    </aside>
    
    → 사용자의 선호도를 조사하기 위해 필요한 데이터이다.
    
    **Request Header**
    
    ```jsx
    Authorization : Bearer <access_token>
    Content-Type : application/json
    Accept : application/json
    ```
    
    **Query String**
    필요 없다.
    

## ⚡ 트러블 슈팅

---

- ⚡이슈 No.1
    
    **`이슈`**
    
    👉 ‘Nodemon’ 실습을 진행하던 도중 오류가 발생했다.
    
    https://www.notion.so/makeus-challenge/Chapter-3-API-URL-1b7b57f4596b80beb693cd481eaa2b61?pvs=4#1cab57f4596b80d39e45e68638139be2
    
    **`문제`**
    
    👉 무엇이 문제인지 아직 찾지 못하였다.
    
    **`해결`**
    
    👉  
    
    **`참고레퍼런스`**
    
    - 

## 🤔 참고 자료

[3주차](Chapter%203%20API%20URL%E1%84%8B%E1%85%B4%20%E1%84%89%E1%85%A5%E1%86%AF%E1%84%80%E1%85%A8%20&%20%E1%84%91%E1%85%B3%E1%84%85%E1%85%A9%E1%84%8C%E1%85%A6%E1%86%A8%E1%84%90%E1%85%B3%20%E1%84%89%E1%85%A6%E1%84%90%E1%85%B5%E1%86%BC%201b7b57f4596b80beb693cd481eaa2b61/3%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1%201b7b57f4596b81a19f56d95ccd2c2ae6.csv)