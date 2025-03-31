**< 시니어 미션 >**

[시니어 미션](%E1%84%89%E1%85%B5%E1%84%82%E1%85%B5%E1%84%8B%E1%85%A5%20%E1%84%86%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB%201b7b57f4596b81f69cc9f01e7ea20586.md)

## 💪 미션 기록 (여기에 해도 되고 위의 미션에서 각 페이지 밑에 간단하게 블록 만들어서 하셔도 됩니다!)

---

<aside>
🍀 미션 기록의 경우, 아래 미션 기록 토글 속에 작성하시거나, 페이지를 새로 생성하여 해당 페이지에 기록하여도 좋습니다!

하지만, 결과물만 올리는 것이 아닌, **중간 과정 모두 기록하셔야 한다는 점!** 잊지 말아주세요.

</aside>

- **미션 기록**
    - 내가 진행중, 진행 완료한 미션 모아서 보는 쿼리 (페이징 포함)
        
        ### 관련 테이블
        
        ### `User_Mission`
        
        - `user_id`
        - `mission_id`
        - `status` (ENUM: `'in_progress'`, `'completed'`)
        - `challenged_at`, `completed_at`
        
        ### `Missions`
        
        - `mission_id`
        - `mission_name`, `description`, `due_date` 등 미션 상세 정보
        
        > 특정 유저가 참여한 미션 목록을 진행중, 완료 구분 없이 페이징 처리해서 최신순(`challenged at`)으로 조회
        > 
        
        ```sql
        SELECT 
            m.mission_id,
            m.mission_name,
            m.description,
            m.due_date,
            um.status,
            um.challenged_at,
            um.completed_at
        FROM User_Mission um
        JOIN Missions m ON um.mission_id = m.mission_id
        WHERE um.user_id = '사용자 ID'
        ORDER BY um.challenged_at DESC
        LIMIT 10 OFFSET 0;
        ```
        
    - 리뷰 작성하는 쿼리, * 사진의 경우는 일단 배제
        
        ### 관련 테이블
        
        ### `Reviews`
        
        - `review_id`
        - `store_id` → 어떤 가게에 대한 리뷰인지
        - `review_content` → 리뷰 본문
        - `rating` → 평점
        - `created_at`, `updated_at` → 작성 시각
        
        ```sql
        INSERT INTO Reviews (
            review_id,
            store_id,
            review_content,
            rating,
            created_at,
            updated_at
        ) VALUES (
            101,
            5,
            '음식이 맛있고 친절했어요!',
            'good',
            NOW(),
            NOW()
        );
        ```
        
    - 홈 화면 쿼리 (현재 선택 된 지역에서 도전이 가능한 미션 목록, 페이징 포함)
        
        ### 관련 테이블
        
        ### `Missions`
        
        - `store_id`
        - `mission_name`
        - `due_date`
        - `owner_number`
        - `reward_point` 등
        
        ### `Stores`
        
        - `store_id`
        - `store_address`
        
        ### `Users`
        
        - `user_id`
        - `address` ← 사용자가 선택한 지역 정보로 추정
        
        > `Stores.store_address`에 해당 문자열이 포함되어 있는지로 지역 필터링
        
        도전 가능한 미션 → `due_date` 가 아직 지나지 않은 것
        > 
        
        ```sql
        SELECT 
            m.mission_id,
            m.mission_name,
            m.description,
            m.reward_point,
            m.due_date,
            s.store_name,
            s.store_address
        FROM Missions m
        JOIN Stores s ON m.store_id = s.store_id
        WHERE s.store_address LIKE CONCAT('%사용자 선택 지역%')
          AND m.due_date > NOW()  -- 마감 전인 미션만
        ORDER BY m.due_date ASC
        LIMIT 10 OFFSET 0;
        ```
        
    - 마이 페이지 화면 쿼리
        
        ### 관련 테이블
        
        ### `Users`
        
        - `name`
        - `nickname`
        - `profile_image_url`
        - `point`
        - `status`
        - `created_at` 등
        
        ### `User_Mission`
        
        - 참여한 미션 현황 (`status`, `challenged_at`, `completed_at`)
        
        ### `Missions`
        
        - 미션 이름, 보상 등
        
        ### `Points`
        
        - 적립 내역 (얼마 적립했는지, 어떤 미션으로 적립했는지)
        
        ### `Notifications`
        
        - 알림 목록
        
        ```sql
        SELECT 
            u.nickname,
            u.email,
            CASE
                WHEN u.phone_number IS NOT NULL THEN '인증됨'
                ELSE '미인증'
            END AS phone_verification_status,
            u.profile_image_url,
            u.point
        FROM 
            Users u
        WHERE 
            u.user_id = '사용자 ID';
        ```