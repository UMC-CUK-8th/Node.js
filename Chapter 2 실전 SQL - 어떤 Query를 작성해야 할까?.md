## 📢 학습 후기

💡 SQL은 어렴풋이 알고 있던 개념이었다. 직접 작성해보니 읽기만 하던 것보다는 이해가 잘 되는 것 같으나, 아직도 많이 부족한 것 같다. 여러 가지 방식으로 작성해보면서 실력을 키워야할 것 같다. 특히 JOIN 과 서브 쿼리를 어떻게 효율적으로 활용할 수 있을지 고민해보아야겠다.

</aside>

## 💪 미션 기록

---

    <지난 주 ERD>
    
    ![erd](https://github.com/user-attachments/assets/71d97bce-c897-4074-a417-b2d806086492)


    > 지난 주 미션 당시 user_region 테이블을 따로 설계하였으나, 이미 만들어져 있는 테이블을 활용하는 방식을 추천한다는 피드백을 받았다. 이를 참고하여 ERD를 재구성, 재구성한 ERD를 바탕으로 쿼리를 작성하였다.
    >
    
    1. 진행 중, 진행 완료한 미션에 대한 쿼리 작성(페이징 포함)
    
    [데이터 베이스 설계]
    
    - user 테이블 : user의 정보 저장. user_id(PK)
    - user_mission 테이블 : user_id와 mission_id를 FK로 사용, 미션의 상태를 표시함.(status, start_at, completed_at)
    - mission 테이블 : store_id를 FK로 사용, 미션의 내용과 미션을 완료할 시 얻을 수 있는 reward_point를 표시함.(mission_content, reward_point)
    
    [쿼리 작성]
    
    1.1. 진행 중인 미션 쿼리
    
    ```sql
    SELECT
      m.mission_content AS content,
      um.user_id,
      um.mission_id,
      m.reward_point AS reward,
      s.store_name,
      m.mission_status
    FROM
      user_mission AS um
    JOIN
      mission AS m ON um.mission_id = m.mission_id
    JOIN
      store AS s ON m.store_id = s.store_id
    WHERE
      um.mission_status = 'in_progress'
    ORDER BY
      um.start_at ASC
    LIMIT 10 OFFSET 0;
    ```
    
    1.2. 진행 완료된 미션 쿼리
    
    ```sql
    SELECT
      m.mission_content AS content,
      um.user_id,
      um.mission_id,
      m.reward_point AS reward,
      s.store_name,
      m.mission_status
    FROM
      user_mission AS um
    JOIN
      mission AS m ON um.mission_id = m.mission_id
    JOIN
      store AS s ON m.store_id = s.store_id
    WHERE
      um.mission_status = 'completed'
    ORDER BY
      um.start_at ASC
    LIMIT 10 OFFSET 0;
    ```
    
    → ‘진행 중’/’진행 완료’ 를 나타내는 페이지가 따로 설정되어 있어 쿼리를 따로 작성하였다.
    
    → 가게 이름, 미션 내용, 미션 성공 시 주어지는 포인트, 성공 여부가 화면에 보이고 있으므로 이를 나타내는 내용을 추가하여 쿼리를 작성하였다. 
    
    → 페이징을 요구하고 있으므로, limit을 10으로 설정하여 페이징하였다.
    
    2. 리뷰 작성 화면에 대한 쿼리 작성(사진 배제)
    
    [데이터 베이스 설계]
    
    - user 테이블 : user의 정보 저장. user_id(PK)
    - review 테이블 : store_id, user_id 를 FK로 사용, 리뷰 내용 및 별점, 작성 날짜, 사장님의 답글 저장.(rating, review_content, created_at, reply)
    - store 테이블: 가게에 대한 정보 저장. store_id(PK)
    
    [쿼리 작성]
    
    2.1. 리뷰 작성 화면
    
    ```sql
    SELECT
      u.user_id,
      u.name AS user_name,
      s.store_id,
      r.review_id,
      r.rating,
      r.review_content AS content,
      r.created_at,
      r.reply
    FROM
      review AS r
    JOIN
      user AS u ON r.user_id = u.user_id
    JOIN
      store AS s ON r.store_id = s.store_id
    ORDER BY
      r.created_at ASC;
    ```
    

→ 리뷰 별로 작성한 날짜, 작성자 닉네임, 리뷰 내용, 별점을 화면에 보이고 있고, 사장님의 답글을 포함하고 있어 이를 포함하여 보일 수 있도록 쿼리를 작성하였다.(사진 제외)

3. 홈 화면에 대한 쿼리 작성(페이징 포함)

[데이터 베이스 설계]

- store 테이블 : store에 대한 정보 저장. store_id(PK)
- region 테이블 : region에 대한 정보 저장. region_id(PK)
- mission 테이블 : store_id, region_id를 FK로 사용, 미션의 내용과 미션을 완료할 시 얻을 수 있는 reward_point, 미션이 생성된 날짜를 표시함.(mission_content, reward_point, created_at)
- user_mission 테이블 : user_id와 mission_id, region_id를 FK로 사용, 미션의 상태를 표시함.(status, start_at, completed_at)

[쿼리 작성]

3.1. 홈 화면에 대한 쿼리 작성(페이징 포함)

```sql
SELECT
  u.user_id,
  r.region_id,
  r.region_name,
  COUNT(um.user_mission_id) AS completed_mission,
  s.store_name,
  s.cuisine,
  m.mission_content,
  m.reward_point,
  m.created_at
FROM 
  User AS u
JOIN 
  User_mission AS um ON u.user_id = um.user_id
JOIN
  Mission AS m ON m.mission_id = um.mission_id
JOIN
  Regions AS r ON r.region_id = m.region_id
JOIN
  Store AS s ON s.region_id = r.region_id
ORDER BY
  m.created_at ASC
LIMIT 10 OFFSET 0;
```

→ 현재 지역을 표시하고, 해당 지역에서 진행한 미션 개수를 보이기 위해 COUNT를 사용, completed_mission의 개수를 count하였다.

→ 도전이 가능한 미션 목록을 표시하는데, 가게 이름, 가게 업종(cuision), 완료 시 얻을 수 있는 포인트(reward_point), 미션 내용을 표시할 수 있도록 쿼리를 작성하였다.

→ 남은 기간 또한 화면에 나타내고 있으나, 기한이 임박한 순서로 나타내야 한다고 판단, ASC를 이용해 오름차순으로 정렬하였고, 페이징을 요구하고 있으므로, limit을 10으로 설정해 페이징하였다.

4. 마이 페이지 화면 쿼리 작성

[데이터 베이스 설계]

- user 테이블 : 닉네임, 이메일, 휴대폰 번호 및 인증 여부, 프로필 사진  url, 사용자의 포인트 정보에 관한 정보를 저장. (user_id(PK), name, email, phone_number, is_phone_verified, profile_iamge_url, user_point)

[쿼리 작성]

4.1. 마이 페이지에 대한 쿼리 작성

```sql
SELECT
  u.user_id,
  u.name AS nickname,
  u.email,
  u.phone_number,
  u.is_phone_verified,
  u.profile_image_url,
  u.user_point AS point
FROM
  user AS u;
```

→ 작성한 리뷰, 작성한 문의글, 알림 설정, 로그아웃 부분의 경우, 현재 화면에서 보여주는 것이 아닌, 페이지로 연동하는 것이므로 작성해줄 필요가 없다.

## ⚡ 트러블 슈팅

---

- ⚡이슈 No.1
    
    **`이슈`**
    
    👉 본문을 보면 페이징을 구현할 때에, 오류를 줄이기 위해 offset paging 보다는 cusor paging을 추천하는 것을 알 수 있다. 하지만 직접 구현할 때에 cusor paging을 어떻게 활용해야하는지 감이 오지 않아 우선적으로 offset paging을 사용하였다.
    
    **`문제`**
    
    👉 cusor paging을 직접 구현하는 데에 어려움이 있다. 좀 더 공부하고, 찾아본 다음 이 부분을 보완해야할 것 같다.
    
    **`해결`**
    
    👉  
    
    **`참고레퍼런스`**
    
    - 

## 🤔 참고 자료

[2주차](Chapter%202%20%E1%84%89%E1%85%B5%E1%86%AF%E1%84%8C%E1%85%A5%E1%86%AB%20SQL%20-%20%E1%84%8B%E1%85%A5%E1%84%84%E1%85%A5%E1%86%AB%20Query%E1%84%85%E1%85%B3%E1%86%AF%20%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%89%E1%85%A5%E1%86%BC%E1%84%92%E1%85%A2%E1%84%8B%E1%85%A3%20%E1%84%92%201b7b57f4596b8022995cf59e4dc7d629/2%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1%201b7b57f4596b81b78594eeb38409dd9e.csv)
