# 시니어 미션

- [x]  미션 자료로 제공된 피그마를 보고 ERD를 설계한 후 제 1,2,3 정규화를 통해 제 1,2,3 정규형을 만들고 각각 중복된 데이터가 어떻게 변화하였고 어떠한 이점이 있었는 지 작성하여 주세요
    - 내용들을 간단하게 정리하여 주세요
        - 제1정규형 (1NF) : **원자값으로 분해**
            
            ### [정규화 전 문제]
            
            - 하나의 속성에 **여러 값이 들어 있는 경우 존재**
                - e. g.  `food_category = "한식, 디저트"`
                - e. g.  `mission_status = "도전 중, 완료됨"`
            
            ### [해결 방법]
            
            - 모든 속성을 **원자값(atomic value)**으로 분해
            - 반복되는 값은 **별도의 행 또는 테이블**로 분리
            
            ### [결과]
            
            ```
            user_name, user_email, store_name, store_address,
            store_category, food_category, mission_description,
            mission_reward_point, mission_due_date, region_name, mission_status
            ```
            
            - 모든 컬럼이 단일 값을 가지도록 구조 정리
            - e. g.  `food_category` → `FoodCategories` 테이블로 분리
        - 제2정규형 (2NF) : **부분 함수 종속 제거**
            
            ### [정규화 전 문제]
            
            복합키의 **일부에만 종속된 속성**이 존재
            
            - e. g.  `store_address`, `store_category`는 `store_name`에만 종속
            
            ### [해결 방법]
            
            - 복합키 테이블을 **주제별 테이블로 분리**
            - `Users`, `Stores`, `Missions` 등 독립 테이블 생성
            
            ### [결과]
            
            - `Users`: 사용자 정보만 포함
            - `Stores`: 매장 정보 분리
            - `Missions`: 미션 정보만 관리
            - `User_Mission`: 사용자의 도전 기록만 별도로 추적
        - 제3정규형 (3NF) : **이행적 종속 제거**
            
            ### [정규화 전 문제]
            
            **기본키가 아닌 컬럼에 종속된 컬럼**이 존재 (이행적 종속)
            
            - e.g.  `store_category_name`은 `store_category_id`에 종속됨
            
            ### [해결 방법]
            
            - `StoreCategories`, `FoodCategories`테이블로 분리
            - 각각의 카테고리를 **ID 중심으로 관리**
            
            ### [결과]
            
            - 모든 테이블이 **직접적인 종속성만 가지도록 재구성**
            - 변경/추가가 발생해도 **중복 없이 수정 가능**

- [x]  피그마의 홈 부분에서 한 사람이 “미션 도전!” 버튼을 빠르게 여러 번 눌렀을 때 여러 가지 이유(비동기 로직 등)로 요청이 지연되어 완전히 처리하기 전 두 번 요청이 들어갈 수 있습니다. 이를 해결할 수 있는 방법에 대해 작성하여 주세요 (ERD 직접적으로 관련이 있기보다는 설계할 때 한번쯤 고민해보면 좋을 것 추가시켜 놓았습니다) (다양한 방법이 있으니 찾아봐 주세요)
    - 내용들을 간단하게 정리하여 주세요
        
        ### **1. 요청 중복 방지 로직 구현**
        
        - 사용자의 동일한 미션 도전 요청이 **이미 처리 중이라면** 새 요청을 무시
        - 예시: 서버 캐시로 중복 요청 차단
            - Redis 같은 캐시 서버를 활용
            - 키: `user:{user_id}:mission:{mission_id}:in_progress`
            - 첫 요청 시 키를 저장하고, 일정 시간동안 다시 요청 못하도록 설정
        
        ### 2. DB에 Unique 제약조건 걸기
        
        - `User_Mission` 테이블에 `(user_id, mission_id)` 조합을 `UNIQUE`로 설정
        - 중복 INSERT 시 **DB가 직접 에러 발생시켜 중복 방지**
        - 예시:
            
            ```sql
            ALTER TABLE User_Mission
            ADD CONSTRAINT uc_user_mission UNIQUE (user_id, mission_id);
            ```
            
        
        ### 3. 트랜잭션 + 중복 체크
        
        - `INSERT` 전에 `SELECT`로 도전 기록 있는지 조회
        - 없을 때만 `INSERT` 진행
        - 단, **동시성 이슈 방지 위해 트랜잭션 사용 필수**
        - 예시:
            
            ```sql
            BEGIN;
            
            SELECT * FROM User_Mission WHERE user_id = ? AND mission_id = ? FOR UPDATE;
            
            -- 결과 없을 경우에만 도전 등록
            INSERT INTO User_Mission (...);
            
            COMMIT;
            ```
            

정리된 글을 바탕으로 블로그를 작성하여 주세요