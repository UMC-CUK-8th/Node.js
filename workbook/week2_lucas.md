# Chapter 2. 실전 SQL - 어떤 Query를 작성해야 할까?

# 🎯 핵심 키워드

---

<aside>
💡 주요 내용들에 대해 조사해보고, 자신만의 생각을 통해 정리해보세요!
레퍼런스를 참고하여 정의, 속성, 장단점 등을 적어주셔도 됩니다.
조사는 공식 홈페이지 **Best**, 블로그(최신 날짜) **Not Bad**

</aside>

이번 주차는 키워드가 딱히 없습니다!

원하실 경우 join연산에 대해 더 알아보는 정도면 될 것 같습니다.

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

### 중간중간 몰랐던 거 정리한거 아카이브

<aside>
<img src="%EA%B8%B0%EB%B3%B8_%EB%98%98%EB%B3%91.png" alt="%EA%B8%B0%EB%B3%B8_%EB%98%98%EB%B3%91.png" width="40px" />

**join이란?**

두 개의 테이블을 서로 묶어서 하나의 결과를 만들어 내는 것

- **🚧 Join의 종류**
    - **INNER JOIN(내부 조인)**은 두 테이블을 조인할 때, 두 테이블에 모두 지정한 열의 데이터가 있어야 한다.
    - **OUTER JOIN(외부 조인)**은 두 테이블을 조인할 때, 1개의 테이블에만 데이터가 있어도 결과가 나온다.
    - **CROSS JOIN(상호 조인)**은 한쪽 테이블의 모든 행과 다른 쪽 테이블의 모든 행을 조인하는 기능이다.
    - **SELF JOIN(자체 조인)**은 자신이 자신과 조인한다는 의미로, 1개의 이블을 사용한다.
    - **INNER JOIN (내부 조인)**
        
        ![image.png](cf9fbbdb-696d-4254-a469-2d5174c1d03b.png)
        
        두 테이블을 연결할 때 가장 많이 사용하는  것이 내부 조인입니다. 그냥 조인이라고 부르면 내부 조인을 의미
        
    - **OUTER JOIN (외부 조인)**
        
        ![image.png](f845c47a-ee31-44ff-bf9f-37558b5da120.png)
        
        내부 조인은 두 테이블에 모두 데이터가 있어야만 결과가 나오지만, 외부 조인은 한쪽에만 데이터가 있어도 결과가 나옴
        
        **종류**
        
        - **LEFT** OUTER JOIN: 왼쪽 테이블의 모든 값이 출력되는 조인
        - **RIGHT** OUTER JOIN: 오른쪽 테이블의 모든 값이 출력되는 조인
        - **FULL** OUTER JOIN: 왼쪽 외부 조인과 오른쪽 외부 조인이 합쳐진 것
    - **CROSS JOIN (상호 조인) = 카티션 곱(CARTESIAN PRODUCT)**
        
        ![image.png](image.png)
        
        한쪽 테이블의 모든 행과 다른 쪽 테이블의 모든 행을 조인시키는 기능입니다. 상호 조인 결과의 전체 행 개수는 두 테이블의 각 행의 개수를 곱한 수만큼 됨
        
    - **SELF JOIN (자체 조인)**
        
        ![image.png](image%201.png)
        
        자체 조인은 자기 자신과 조인하므로 1개의 테이블을 사용합니다. 별도의 문법이 있는 것은 아니고 1개로 조인하면 자체 조인이 됩니다.
        
</aside>

<aside>
<img src="%EA%B8%B0%EB%B3%B8_%EB%98%98%EB%B3%91.png" alt="%EA%B8%B0%EB%B3%B8_%EB%98%98%EB%B3%91.png" width="40px" />

**subquery란?**

하나의 SQL 문 안에 포함되어 있는 또 다른 SQL문을 말함.

서브쿼리는 메인쿼리가 서브쿼리를 포함하는 종속적인 관계이다.

```jsx
#메인쿼리
SELECT =
FROM db_table
WHERE table_fk IN (
	#서브쿼리
	SELECT table_fk FROM db_table_other WHERE ..
	)
```

조인은 조인에 참여하는 모든 테이블이 대등한 관계에 있기 때문에 조인에 참여하는 모든 테이블의 칼럼을 어느 위치에서라도 자유롭게 사용할 수 있다. 그러나 서브쿼리는 메인 쿼리의 칼럼을 모두 사용할수 있지만, 메인쿼리는 서브쿼리의 칼럼을 사용할 수 없다.

- **서브쿼리를 사용할 때 주의할 점**
    1. 서브쿼리를 괄호로 감싸서 사용
    2. 서브쿼리는 단일 행 또는 복수 행 비교 연산자와 함께 사용 가능
    3. 서브쿼리에서는 ORDER BY를 사용하지 못함
- **서브쿼리가 사용이 가능한 곳**
    - SELECT
    - FROM
    - WHERE
    - HAVING
    - ORDER BY
    - INSERT문의 VALUES
    - UPDATE문의 SET
- **서브쿼리의 종류**
    1. 단일행 서브쿼리 (Single Row Subquery)
    
    ```jsx
    SELECT = 
    FROM Player
    WHERE Team_ID = (
    	SELECT Team_ID
    	FROM Player
    	WHERE Player_name = "yonglae"
    	)
    ORDER BY Team_name;
    ```
    
    1. 다중행 서브쿼리 (Multiple Row Subquery)
    
    ```jsx
    SELECT = 
    FROM Team
    WHERE Team_ID IN (
    	SELECT Team_ID
    	FROM Player
    	WHERE Player_name = "yonglae"
    	)
    ORDER BY Team_name;
    ```
    
    1. 다중컬럼 서브쿼리 (Mulyi Column Subquery)
    
    ```jsx
    SELECT =
    FROM Player
    WHERE (Team_ID, Height) IN (
    	SELECT Team_ID, MIN(Height)
    	FROM Player
    	GROUP BY Team_ID
    	)
    ORDER BY Team_ID, Player_name;
    ```
    
</aside>

<aside>
<img src="%EA%B8%B0%EB%B3%B8_%EB%98%98%EB%B3%91.png" alt="%EA%B8%B0%EB%B3%B8_%EB%98%98%EB%B3%91.png" width="40px" />

**count( ) 함수**

괄호 안 항목의 개수를 카운트하는 함수

✍ COUNT(*) = COUNT(1)

✍ COUNT(*) - NULL 포함

✍ COUNT(column명) - NULL 제외

- COUNT(*)
    
    ```jsx
    SELECT COUNT(*)
    FROM Customers;
    ```
    
    결과 ⇒ 91
    위의 예시는 모든 것을 뜻하는 (*)을 이용해 COUNT함. 즉, row 개수를 카운트하는 것과 마찬가지
    
- COUNT(1)
    
    ```jsx
    SELECT COUNT(1)
    FROM Customers;
    ```
    
    결과 ⇒ 91
    COUNT(1) = COUNT(*)
    
    서버 내부 동작이 빠르게 작용한다는 이점이 있음
    
- COUNT(column명)
    
    count(column명)은 위에서 이용했던 결과와 다르게 null값을 포함하느냐 안하느냐의 차이가 있음. column명을 지정해주면 null값을 제외한 row 개수를 반환함
    
    ```jsx
    select count(*)
    from order_details;
    ```
    
    결과 ⇒ 58
    
    ```jsx
    select count(purchase_order_id)
    from order_details;
    ```
    
    결과 ⇒ 15
    count(*)일 때와 count(purchase_order_id)일 때 결과값이 다른 것을 확인할 수 있습니다.
    
    따라서 어떤 의도로 count를 쓰는지 정확히 파악한 후에 괄호안의 값을 지정해야함
    

출처: https://becomeanexpert.tistory.com/47

</aside>

<aside>
<img src="%EA%B8%B0%EB%B3%B8_%EB%98%98%EB%B3%91.png" alt="%EA%B8%B0%EB%B3%B8_%EB%98%98%EB%B3%91.png" width="40px" />

**레코드란?**

논리적으로 연관된 필드의 집합을 의미
엑셀의 행 row애 해당되며 튜플 Tuple로 부르기도 함
출처: https://93jpark.tistory.com/23

</aside>

<aside>
<img src="%EA%B8%B0%EB%B3%B8_%EB%98%98%EB%B3%91.png" alt="%EA%B8%B0%EB%B3%B8_%EB%98%98%EB%B3%91.png" width="40px" />

**두 쿼리문의 성능 차이**

|  | **NOT IN 사용한 쿼리문** | **LEFT JOIN 사용한 쿼리문** |
| --- | --- | --- |
| 작동방식 | book_like 테이블을 필터링하여 book_id가 3인 레코드를 찾음 → 
block 테이블에서 owner_id가 2인 사용자의 target_id 목록을 가져옴 → book_like 결과에서 user_id가 차단된 사용자 목록에 없는 레코드만 최종적으로 필터링 | book_like 테이블과 block 테이블을 LEFT JOIN하여 user_id와 target_id가 일치하고 owner_id가 2인 레코드를 연결 → 조건을 추가해서 book_id가 3이면서, block 테이블과 조인되지 않은 레코드 (즉, 차단되지 않은 사용자의 좋아요)만 선택 |
| 성능 | NOT IN 하위 쿼리는 내부적으로 전체 block 테이블을 스캔해야 할 수 있으므로, 테이블 크기가 클수록 성능이 저하됨
데이터베이스 시스템에 따라 하위 쿼리 최적화가 다르게 작동함 | LEFT JOIN은 인덱스를 효과적으로 사용할 수 있으므로, NOT IN보다 성능이 좋음.
LEFT JOIN을 사용할 경우에는, 데이터베이스 시스템이 Join에 사용하는 인덱스를 사용하기에, 일반적으로 NOT IN보다 더욱 효율적이라고 알려져 있음 |
| 가독성 |  | LEFT JOIN을 사용하면 쿼리 의도를 명확하게 표현할 수 있어 가독성이 좋음 |
</aside>

## 🔥 미션

---

1. 1주차 때 설계한 데이터베이스를 토대로 아래의 화면에 대한 쿼리를 작성

![내가 진행중, 진행 완료한 미션 모아서 보는 쿼리(페이징 포함)](Untitled%204.png)

내가 진행중, 진행 완료한 미션 모아서 보는 쿼리(페이징 포함)

![리뷰 작성하는 쿼리,
* 사진의 경우는 일단 배제](Untitled%205.png)

리뷰 작성하는 쿼리,
* 사진의 경우는 일단 배제

![홈 화면 쿼리
(현재 선택 된 지역에서 도전이 가능한 미션 목록, 페이징 포함)](Untitled%206.png)

홈 화면 쿼리
(현재 선택 된 지역에서 도전이 가능한 미션 목록, 페이징 포함)

![마이 페이지 화면 쿼리](Untitled%207.png)

마이 페이지 화면 쿼리

## 💪 미션 기록 (여기에 해도 되고 위의 미션에서 각 페이지 밑에 간단하게 블록 만들어서 하셔도 됩니다!)

---

<aside>
🍀 미션 기록의 경우, 아래 미션 기록 토글 속에 작성하시거나, 페이지를 새로 생성하여 해당 페이지에 기록하여도 좋습니다!

하지만, 결과물만 올리는 것이 아닌, **중간 과정 모두 기록하셔야 한다는 점!** 잊지 말아주세요.

</aside>

![image.png](image%202.png)

new ERD (사실, 2주차 워크북 배낀거긴한데 ㅎ)

쨋든 이걸 토대로 쿼리문을 작성하겠습니다.

![image.png](image%203.png)

sql 실행하자마자 member에서 오류가 뜸
쒯 알고보니 뭐 숨겨진 문자? 이러셔서 바로 수정

![image.png](image%204.png)

세팅 완료~

### 1. 내가 진행중, 진행 완료 한 미션 모아서 보는 쿼리 (페이징 포함)

```sql
USE lucas;

SELECT
    mm.mission_id,
    m.mission_spec,
    m.reward,
    m.deadline,
    mm.status,
    mm.created_at,
    mm.updated_at
FROM
    member_mission mm
JOIN
    mission m ON mm.mission_id = m.id
WHERE
    mm.member_id = '특정_멤버_ID' -- 실제 멤버 ID로 변경
    AND mm.status IN ('진행 중', '완료')
ORDER BY
    mm.updated_at DESC
LIMIT 10 OFFSET 10;
```

일단 시간 관계 상 gemini를 쓰긴했다. 죄송합니다.

그리고 CREATE TABLE이 계속되면서 오류가 생겨서 해당 부분은 주석처리를 했습니다.

일단 한줄씩 해석을 해볼게요.

```sql
SELECT
    미션_ID,
    미션_제목,
    진행_상태,
    완료_날짜
FROM
    미션_테이블
WHERE
    사용자_ID = '특정_사용자_ID'
    AND 진행_상태 IN ('진행 중', '완료')
ORDER BY
    완료_날짜 DESC
LIMIT
    페이지_크기 OFFSET (페이지_번호 - 1) * 페이지_크기;
```

### 2. 리뷰 작성하는 쿼리  * 사진의 경우는 일단 배제

```sql
INSERT INTO review (member_id, store_id, body, score)
VALUES (1, 10, '정말 맛있어요!', 5.0);
```

이번에도 마찬가지로 gemin의 힘을 빌려봤다.

그랬더니

| 0 | 13 | 02:56:53 | INSERT INTO review (member_id, store_id, body, score) VALUES (1, 10, '정말 맛있어요!', 5.0) | Error Code: 1364. Field 'id' doesn't have a default value | 0.016 sec |
| --- | --- | --- | --- | --- | --- |

이런 오류가 떠버렸다.

`review` 테이블의 `id` 컬럼에 기본값이 설정되어 있지 않고, `INSERT` 문에서 `id` 값을 명시적으로 지정하지 않았기 때문에 발생했다고 해서 명시적으로 넣었더니 또 문제가 생겼다.
그런데 생각해보니 난 글을 등록하지 않아 애초에 id도 없고 뭐도 없는데 리뷰가 작성될 일이 당연히 없었다!

아하! 난 바보였다.

### 3. 홈 화면 쿼리 (현재 선택 된 지역에서 도전이 가능한 미션 목록, 페이징 포함)

```sql
SELECT
    m.id AS mission_id,
    m.mission_spec,
    m.reward,
    m.deadline,
    s.name AS store_name,
    s.address AS store_address
FROM
    mission m
JOIN
    store s ON m.id = (
        SELECT mission_id
        FROM member_mission
        WHERE member_id = 1 -- 멤버 id 특정
    )
WHERE
    s.region_id = (SELECT id from region where name = '안암동') -- 지역 이름 특정
    AND m.deadline >= NOW() -- 마감일이 현재 시간 이후인 미션만 조회
ORDER BY
    m.deadline ASC -- 마감일 기준으로 오름차순 정렬
LIMIT 10 OFFSET 0
```

성공

| 3 | 19 | 03:01:53 | SELECT     m.id AS mission_id,     m.mission_spec,     m.reward,     m.deadline,     s.name AS store_name,     s.address AS store_address FROM     mission m JOIN     store s ON m.id = (         SELECT mission_id         FROM member_mission         WHERE member_id = 1 -- 멤버 id 특정     ) WHERE     s.region_id = (SELECT id from region where name = '안암동') -- 지역 이름 특정     AND m.deadline >= NOW() -- 마감일이 현재 시간 이후인 미션만 조회 ORDER BY     m.deadline ASC -- 마감일 기준으로 오름차순 정렬 LIMIT 10 OFFSET 0 | 0 row(s) returned | 0.016 sec / 0.000 sec |
| --- | --- | --- | --- | --- | --- |

### 4. 마이 페이지 화면 쿼리

```sql
-- ALTER TABLE member ADD phone_number VARCHAR(20); -- VARCHAR(20)은 예시이며, 적절한 데이터 타입을 선택해야 합니다.

SELECT
    m.name AS nickname,
    m.email,
    m.point,
    (SELECT COUNT(*) FROM review WHERE member_id = m.id) AS review_count,
    m.phone_number
FROM
    member m
WHERE
    m.id = 1;
```

일단 member에 phone_number가 없어서 추가해놨습니다.

그리고 이걸 실행했을 때도 여전히 리뷰의 id가 없기때문에 실행은 오작동했습니다.

다음에는 진짜 지대로 공부해서 직접 쿼리문을 작성하는 가톨릭대 UMC 회장 루카스가 되겠습니다~!!

## ⚡ 트러블 슈팅

---

<aside>
💡 실습하면서 생긴 문제들에 대해서, **이슈 - 문제 - 해결** 순서로 작성해주세요.

</aside>

<aside>
💡 스스로 해결하기 어렵다면? 스터디원들에게 도움을 요청하거나 **너디너리의 지식IN 채널에 질문**해보세요!

</aside>

- ⚡이슈 작성 예시 (이슈가 생기면 아래를 복사해서 No.1, No.2, No3 … 으로 작성해서 트러블 슈팅을 꼭 해보세요!)
    
    **`이슈`**
    
    👉 앱 실행 중에 노래 다음 버튼을 누르니까 앱이 종료되었다.
    
    **`문제`**
    
    👉 노래클래스의 데이터리스트의 Size를 넘어서 NullPointException이 발생하여 앱이 종료된 것이었다. 
    
    **`해결`**
    
    👉  노래 다음 버튼을 눌렀을 때 데이터리스트의 Size를 검사해 Size보다 넘어가려고 하면 다음으로 넘어가는 메서드를 실행시키지 않고, 첫 노래로 돌아가게끔 해결
    
    **`참고레퍼런스`**
    
    - 링크
- ⚡이슈 No.1
    
    **`이슈`**
    
    👉 [트러블이 생긴 상태 작성]
    
    **`문제`**
    
    👉 [어떤 이유로 해당 이슈가 일어났는지 작성]
    
    **`해결`**
    
    👉  [해결 방법 작성]
    
    **`참고레퍼런스`**
    
    - [문제 해결 시 참고한 링크]

## 🤔 참고 자료

[2주차](2%E1%84%8C%E1%85%AE%E1%84%8E%E1%85%A1%201b7b57f4596b81d49668e1f1d8660416.csv)

---

Copyright © 2023 최용욱(똘이) All rights reserved.

Copyright © 2024, 2025 제이미(김준환) All rights reserved.