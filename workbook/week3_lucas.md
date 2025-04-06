## 🎯 핵심 키워드

---

<aside>
💡 주요 내용들에 대해 조사해보고, 자신만의 생각을 통해 정리해보세요!
레퍼런스를 참고하여 정의, 속성, 장단점 등을 적어주셔도 됩니다.
조사는 공식 홈페이지 **Best**, 블로그(최신 날짜) **Not Bad**

</aside>

이번 주차는 키워드가 딱히 없습니다!

원하실 경우 Restful API에 대해 한번 더 살펴보면 좋을 것 같습니다.

## 📢 학습 후기

---

- 이번 주차 워크북을 해결해보면서 어땠는지 회고해봅시다.
- 핵심 키워드에 대해 완벽하게 이해했는지? 혹시 이해가 안 되는 부분은 뭐였는지?

<aside>
💡

</aside>

## ⚠️ 스터디 진행 방법

---

1. 스터디를 진행하기 전, 워크북 내용들을 모두 채우고 스터디에서는 서로 모르는 내용들을 공유해주세요.
2. 미션은 워크북 내용들을 모두 완료하고 나서 스터디 전/후로 진행해보세요.
3. 다음주 스터디를 진행하기 전, 지난주 미션을 서로 공유해서 상호 피드백을 진행하시면 됩니다.

## ✅ 실습 체크리스트

---

## ☑️ 실습 인증

---

## 🔥 미션

---

1주차 때 제공된 IA, WF을 참고하여 (아래 **미션 참고 자료**를 보셔도 됩니다!)

- **미션 참고 자료**
    
    <aside>
    🚨 ❗**해당 자료는 챌린저분들의 미션을 위해 Plan 파트에서 제공해준 자료로,
    미션 외의 용도로 사용하는 것 및 유출을 절대 금합니다.**❗
    
    **❗아래 IA&WF 사진 및 for_UMC.fig 파일 및 파일 속 내용의 저작권은 모두 7th UMC Plan 파트장 아크(박승민)에게 있음을 밝힙니다.❗**
    
    </aside>
    
    - IA&WF 사진 파일
        
        아래 사진 외에도 첨부드린 사진에 해당하는 피그마 파일이 존재하니
        사진을 통해 보기 어려우시다면 피그마 파일을 이용해주세요!
        
        ![IA](for_UMC.png)
        
        IA
        
        ![WF](for_UMC%201.png)
        
        WF
        
    
    [for_UMC.fig](for_UMC.fig)
    

<aside>
✉️ **홈 화면, 마이 페이지 리뷰 작성, 미션 목록 조회(진행중, 진행 완료), 미션 성공 누르기,
회원 가입 하기(소셜 로그인 고려 X)**

</aside>

위의 기능을 구현하는데 **필요한 API들을 설계**하여

<aside>
🌟 **API Endpoint, Request Body, Request Header, query String, Path variable**

</aside>

이 포함된 간단한 명세서를 만들기!

실제 명세서는 Spring Boot 8주차 및 Node.js 9주차, Swagger 설정에서 더 자세히 다룹니다.

**< 시니어 미션 >**

[시니어 미션](https://www.notion.so/1b7b57f4596b8140baf3c1efeee3ef74?pvs=21)

## 💪 미션 기록

---

<aside>
🍀 미션 기록의 경우, 아래 미션 기록 토글 속에 작성하시거나, 페이지를 새로 생성하여 해당 페이지에 기록하여도 좋습니다!

하지만, 결과물만 올리는 것이 아닌, **중간 과정 모두 기록하셔야 한다는 점!** 잊지 말아주세요.

</aside>

### 각 화면 별 필요한 기능

1. 홈화면
    - 내 위치, 내 포인트, 알람 여부, 미션 달성 개수(미션 개수에 따른 “미션 10개 달성시 1000 P의 경우 프론트에서 처리), 내 미션 (list로 처리)
        - 내 미션은 식당 이름, 카테고리, 미션 조건, 적립금, 미션 마감일 (디데이의 경우 프론트에서 처리)

# 홈화면

## 홈화면 데이터 조회

- **API Endpoint**: GET/home
- **Description**: 홈 화면에 필요한 사용자 정보 및 미션 목록을 조회
- **Request Header**
    - memberId (required): 회원 ID
- **Response**
    
    ```json
    {
        "location": "안암동",
        "point": 1500,
        "hasAlarm": true,
        "missionAchievementCount": 3,
        "myMissions": [
            {
                "restaurantName": "제주고깃집",
                "category": "한식",
                "missionCondition": "리뷰 작성",
                "reward": 500,
                "deadline": "2024-12-31T23:59:59"
            },
            {
                "restaurantName": "고른햇살",
                "category": "분식",
                "missionCondition": "인증샷 업로드",
                "reward": 300,
                "deadline": "2025-01-15T23:59:59"
            }
        ]
    }
    ```
    
    # 마이페이지
    
    ## 회원 정보 조회
    
    - **API Endpoint**: GET / mypage
    - **Description**: 회원의 정보를 조회합니다.
    - **Request Header**
        - memberId (required): 회원 ID
    - **Response**
        
        ```json
        {
            "nickname": "닉네임",
            "email": "이메일",
            "point": 1000,
            "reviewCount": 5,
            "phoneNumber": "010-1234-5678"
        }
        ```
        
    
    ## 리뷰 작성
    
    - **API Endpoint**: POST /reviews
    - **Description**:  특정 가게에 대한 리뷰를 작성합니다.
    - **Request Header**
        - memberId (required): 회원 ID
    - **Request Body**
        
        ```json
        {
            "storeId": 10,
            "body": "리뷰 내용",
            "score": 4.5
        }
        ```
        
    - **Response**
    
    ## 미션 목록 조회
    
    - **API Endpoint**:GET /members/{memberId}/missions
    - **Description**:  특정 회원의 진행 중/완료 미션 목록을 조회합니다.
    - **Request Header**
        - memberId (required): 회원 ID
    - Query Header
    
    ```json
    status (required): 미션 상태 (진행 중, 완료)
    limit (optional): 반환할 미션 수 (기본값: 10)
    offset (optional): 페이지네이션 offset (기본값: 0)
    ```
    
    - **Request Body**
    
    ```json
    {
        "storeId": 10,
        "body": "리뷰 내용",
        "score": 4.5
    }
    ```
    
    - **Response**
    
    ```json
        {
            "missionId": 1,
            "missionSpec": "미션 내용",
            "reward": 1000,
            "deadline": "2024-12-31T23:59:59",
            "status": "진행 중",
            "createdAt": "2024-01-01T00:00:00",
            "updatedAt": "2024-01-02T00:00:00"
        },    
    ```
    
    ## 미션 성공 처리
    
    - **API Endpoint**: PUT /members/{memberId}/missions/{missionId}/success
    - **Description**:  특정 회원의 특정 미션을 성공 처리합니다.
    - **Request Header**
        - memberId (required): 회원 ID
    - Path Variable
    
    ```json
    Path Variable:
    memberId (required): 회원 ID
    missionId (required): 미션 ID
    ```
    
    - **Request Body**
    
    ## 미션 성공 처리
    
    - **API Endpoint**: PUT /members/{memberId}/missions/{missionId}/success
    - **Description**:  특정 회원의 특정 미션을 성공 처리합니다.
    - **Request Header**
        - memberId (required): 회원 ID
    - Path Variable
    
    ```json
    Path Variable:
    memberId (required): 회원 ID
    missionId (required): 미션 ID
    ```
    
    - **Request Body**
    
    ## 회원가입
    
    - **API Endpoint**: POST/signup
    - **Description**: 회원가입을 처리합니다.
    - **Request Body**
        
        ```jsx
        {
            "name": "닉네임",
            "gender": "성별",
            "age": 25,
            "address": "주소",
            "specAddress": "상세 주소",
            "email": "이메일",
            "phoneNumber": "010-1234-5678",
            "termsIds": [1, 2], // 동의한 약관 ID 목록
            "categoryIds": [1, 2] // 선호하는 카테고리 ID 목록
        }
        ```
        

## ⚡ 트러블 슈팅

---

<aside>
💡 실습하면서 생긴 문제들에 대해서, **이슈 - 문제 - 해결** 순서로 작성해주세요.

</aside>

<aside>
💡 스스로 해결하기 어렵다면? 스터디원들에게 도움을 요청하거나 **너디너리의 지식IN 채널에 질문**해보세요!

</aside>

- ⚡이슈 No.1
    
    **`이슈`**
    
    👉 npm -v 실행시 오류 발생
    
    **`문제`**
    
    👉 실챙 정책 설정과 관련
    
    **`해결`**
    
    👉 GEMINI 참고함
    
    **`참고레퍼런스`**
    
    제공된 오류 메시지는 Windows PowerShell에서 npm 스크립트를 실행할 수 없기 때문에 발생했습니다. 이는 PowerShell의 실행 정책 설정과 관련된 문제입니다. 다음은 문제 해결을 위한 단계별 가이드입니다.
    
    **1. PowerShell 실행 정책 확인**
    
    - PowerShell을 관리자 권한으로 실행합니다. 시작 메뉴에서 "PowerShell"을 검색하고 "관리자 권한으로 실행"을 선택합니다.
    - 다음 명령을 입력하여 현재 실행 정책을 확인합니다.
        - `Get-ExecutionPolicy`
    
    **2. 실행 정책 변경**
    
    - 제한된 실행 정책으로 인해 문제가 발생했을 가능성이 높습니다. 다음 명령을 사용하여 실행 정책을 변경합니다.
        - `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
        - 이 명령어는 현재 사용자에게만 적용되는 RemoteSigned 정책을 설정합니다. 이렇게 하면 로컬 스크립트는 실행할 수 있지만, 다운로드된 스크립트는 신뢰할 수 있는 개발자가 서명한 경우에만 실행됩니다.
        - 변경 사항을 적용할지 묻는 메시지가 나타나면 "Y"를 입력하고 Enter 키를 누릅니다.
    
    **3. 변경 사항 확인**
    
    - 실행 정책이 변경되었는지 다시 확인합니다.
        - `Get-ExecutionPolicy -Scope CurrentUser`
        - 결과가 "RemoteSigned"로 표시되면 설정이 완료된 것입니다.
    
    **4. npm 버전 확인**
    
    - PowerShell을 닫았다가 다시 열고 다음 명령을 사용하여 npm 버전을 확인합니다.
        - `npm -v`

## 🤔 참고 자료

[3주차](3%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1%201b7b57f4596b81e69598e233353c0145.csv)

---

Copyright © 2023 최용욱(똘이) All rights reserved.

Copyright © 2024, 2025 김준환(제이미) All rights reserved.