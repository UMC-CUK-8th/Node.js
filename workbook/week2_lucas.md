# Chapter 2. 실전 SQL - 어떤 Query를 작성해야 할까?

## 📝 학습 목표

---

1. 1주차 때 예시를 기반으로 여러가지 요구 사항에 대한 SQL 쿼리를 고민한다.
2. paging을 고려하여 쿼리를 작성한다.

## 📸 잠깐 ! 스터디 인증샷은 찍으셨나요?📸

---

* 스터디리더께서 대표로 매 주차마다 한 장 남겨주시면 좋겠습니다!🙆💗
 (사진을 저장해서 이미지 임베드를 하셔도 좋고, 복사+붙여넣기해서 넣어주셔도 좋습니다!)

![IMG_1369.jpeg](IMG_1369.jpeg)

## 📑 2주차 주제

---

다들 데이터베이스 설계(1주차 미션)는 잘 하셨나요?

- 저 같은 경우는 아래의 형태로 설계를 했습니다. (참고해주세요!)
    
    ❗1주차 미션에 포함되지 않는 부분은 설계를 하지 않았습니다!
    
    ![1주차 미션 ERD](Untitled.png)
    
    1주차 미션 ERD
    
    <aside>
    💜 위 ERD 사진 수정사항 안내
    
    - member 테이블의 PK 또한 id여야 하는데 해당 내용이 누락되어 member 테이블의 PK가 phone_num이 아닌, id로 생각해주세요!
    - store을 mission이 외래키로 참조하고 있어 1:n 연결선이 필요합니다! (mission:store = n:1)
    </aside>
    

이번 주차는 **몇 가지 요구 사항에 대해 어떻게 쿼리를 만들어야 하는지 같이 고민**해보는 주차입니다.

***join, subquery는 알고 있다는 전제로 시작합니다!***

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

- 참고 자료
    
    [SQL 기본 문법: JOIN(INNER, OUTER, CROSS, SELF JOIN)](https://hongong.hanbit.co.kr/sql-기본-문법-joininner-outer-cross-self-join/)
    
    [[SQL] 테이블 JOIN의 개념과 예제](https://velog.io/@wijoonwu/JOIN)
    
    [[MYSQL] 📚 테이블 조인(JOIN) - 그림으로 알기 쉽게 정리](https://inpa.tistory.com/entry/MYSQL-📚-JOIN-조인-그림으로-알기쉽게-정리)
    
    [SQL / MySQL 서브쿼리(SubQuery)](https://snowple.tistory.com/360)
    
    [[MYSQL] 📚 서브쿼리 개념 & 문법 💯 정리](https://inpa.tistory.com/entry/MYSQL-📚-서브쿼리-정리)
    

😉 ***mysql 기준으로 진행합니다.***

## 🔖 2주차 본문

---

기존 1주차 워크북 본문서 요구하던 요구 사항,
그리고 전 미션(1주차 미션)에서 요구했던 요구 사항 일부에 대해

**어떻게 쿼리를 만드는 것이 좋을지 고민**을 해봅시다.

query 역시 Database 설계처럼 **정해진 답이 없고**,
**join을 사용할 지 혹은 subquery를 사용할 지 선택**하시면 됩니다!

그리고 너무 무리해서 **한번에 거대한 query를 보내기 보다는 힘들 경우,
2개로 쪼개서 보내는 것**도 좋습니다.

![1주차 워크북의 ERD](Untitled%201.png)

1주차 워크북의 ERD

우선 아래의 요구 사항에 대해 어떻게 데이터를 줄지 고민해봅시다.

<aside>
🔑 ***책이 받은 좋아요 개수를 보여준다.***

</aside>

만약, **책 테이블에 좋아요 개수를 둔다면** 아래와 같은 query로 충분하겠죠

```sql
select likes from book;
```

그런데, 만약 **likes 칼럼없이 집계**를 한다면 아래와 같은 query가 필요합니다

```sql
select count(*) from book_likes where book_id = {대상 책 아이디};
```

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

위의 요구 사항에서 추가로 아래와 같은 요구 사항이 생긴다면 어떻게 해야 할까요?

<aside>
🔑 ***책의 좋아요 갯수를 계산하는데, 내가 차단한 사용자의 좋아요는 집계를 하지 않는다.***

</aside>

![차단 테이블](Untitled%202.png)

차단 테이블

우선 차단 테이블이 위와 같다고 해봅시다.

그러면 아래와 같은 쿼리가 필요하게 됩니다.

*책의 아이디가 3, 내 아이디가 2라고 가정합시다!*

```sql
select count(*) from book_like where book_id = 3
	and user_id not in (select target_id from block where owner_id = 2);
```

위의 쿼리문을 아래와 같은 **left join**을 사용하도록 변경이 가능합니다.

```sql
select count(*)
from book_like as bl
left joinblock as b on bl.user_id = b.target_id and b.owner_id = 2
where bl.book_id = 3 and b.target_id is null;
```

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

<aside>
🗣 **참고!**

저 같은 경우, join 연산보다는 **sub query가 더 가독성이 좋다고 생각**해
sub query를 자주 사용합니다!

**원하는 스타일의 query를 선택하여 사용**하시면 될 것 같습니다.

</aside>

그리고 제가 굳이 차단에 대한 요구 사항을 예시로 든 이유는

<aside>
🌟 **TIP)**

***커뮤니티 성격의 app의 경우 신고, 차단 기능이 없을 경우 reject를 받아 런칭이 안됩니다.***

</aside>

따라서 처음에 쿼리를 간단하게 작성했다가 reject를 고려해 모든 쿼리를 수정했던
좋지 않은 경험을 했기에,

여러분들에게 처음부터 아예 신고, 차단을 고려하여 쿼리를 작성 하는 것을 추천 드립니다.

만약 기획이 나오지 않았다면 PM에게 상황을 설명하며 요청을 하시기 바랍니다.

이처럼 이번 주차는 **실제로 접할 수 있는 요구 사항들에 대해 어떻게 접근할지**
몇 가지 예시를 보여 드리겠습니다.

## 실제로 접할 수 있는 요구 사항

---

### *해시태그를 통한 책의 검색*

쿼리를 작성 할 때 N : M 관계로 인해 가운데 매핑 테이블이 추가 된 경우는
쉬운 쿼리로 데이터를 가져오기가 힘듭니다.

***UMC***라는 이름을 가진 해시태그가 붙은 책을 찾도록 해봅시다.

**(DataBase에 #을 붙여서 저장하거나 아니면 # 없이 저장하는 것은 프론트 개발자 분과 상의를 해서 결정을 해야 하고 저 같은 경우는 저번 프로젝트에서 후자로 했기에 후자로 예시를 드리겠습니다.)**

이 역시 직감적으로 조인 연산 혹은 서브 쿼리가 필요함을 느낄 수 있죠

```sql
select * from book where id in 
	(select book_id from book_hash_tag 
			where hash_tag_id  = (select id from hash_tag where name = 'UMC' ));
```

이 쿼리는 다시 아래처럼 join 연산을 사용하도록 변경이 가능합니다.

```sql
select b.*
from book as b
inner join book_hash_tag as bht on b.id = bht.book_id
inner join hash_tag as ht on bht.hash_tag_id = ht.id
where ht.name = 'UMC';
```

자, 이제 책들의 목록을 최신 순으로 조회하는 쿼리를 만들어 봅시다.

간단하게 아래와 같이 만들 수 있겠죠?

편의를 위해 모든 데이터를 다 가져온다고 합시다.

```sql
select * from book order by created_at desc;
```

자, 이번에는 조금 더 어렵게 좋아요 개수 순으로 목록 조회를 한다고 해봅시다.

book 자체에 likes 칼럼이 없기에 단순한 select로는 조회가 안됩니다.

```sql
select * from book as b 
join (select count(*) as like_count
				 from book_likes
						group by book_id) as likes on b.id = likes.book_id
order by likes.like_count desc;
```

이런 형태의 쿼리를 통해 인기 순 정렬이 가능해집니다.

## 페이징(Paging)

---

### 🤔 목록 조회, 이대로 괜찮을까요?

사실 목록 조회는 저렇게만 하면 안됩니다.

예를 들어 책이 100만 권이 있다고 할 때, 저 쿼리를 그대로 사용하게 된다면 

엄청난 렉이 발생하게 되겠죠, 한번에 100만 개를 다 가져오게 되니…😱

따라서 Database자체에서 끊어서 가져오는 것이 필요하고 이를
***paging* 이라고 합니다.**

Paging에도 사실 **2가지 형태**가 존재합니다.

### Offset based 페이징

이는 우리가 자주 봤던 페이징 입니다.

![Untitled](Untitled%203.png)

이렇게 직접 페이지 번호를 찾아내어 이동하는 페이징이죠.

그러면 저런 쿼리는 어떻게 만들까요?

paging 쿼리는 sql마다 상이하며 **UMC는 다시 한 번 말하지만 mysql 기반으로 합니다!**

```sql
select *
from book
order by likes desc
limit 10 offset 0;
```

위와 같이 limit를 통해 한 페이지에서 보여줄 데이터의 개수를 정하고

offset으로 몇 개를 **건너뛸지를 정합니다**.

그러면 아래와 같이 추론이 가능하죠.

**페이지 x번에 대하여 한 페이지에 y개를 보여준다**면

```sql
select * 
from book
order by likes desc
limit y offset(x - 1) * y;
```

이렇게 쿼리를 만들 수 있겠죠?

**왜 (x - 1)이냐면 보통 1페이지가 첫 페이지이기 때문이죠!**

이제 offset paging을 적용해서 위의 목록 조회 query를 만들어 봅시다!

페이지 n번에 대해 한번에 15개씩 보여준다고 합시다.

```sql
select * from book
order by created_at desc
limit 15 offset (n - 1) * 15;
```

**당연히 (n - 1) * 15 이렇게 쿼리에 적으면 안되고… 숫자 계산해서 넣어야 합니다..**

이제 다음으로 인기 순 정렬에 대한 쿼리를 만들어 봅시다.

```sql
select * from book as b
join (select count(*) as like_count
				 from book_likes 
					group by book_id) as likes on b.id = likes.book_id
order by likes.like_count desc
limit 15 offset (n - 1) * 15;
```

### Offset paging의 단점

offset paging은 직접 여러 개의 데이터를 넘어가서 가져온다는 느낌이기에
페이지가 뒤로 갈수록 넘어가는 데이터가 많아져 성능 상의 이슈가 있고,

결정적으로 **아래와 같은 문제 상황이 발생**할 수 있습니다.

<aside>
⚠️ ***사용자가 1 페이지에서 2 페이지로 넘어가려는 찰나, 게시글 6개가 추가가 되었다.***

</aside>

이러면 어떻게 될까요??

🥲 ***분명 2 페이지로 왔는데 1 페이지에서 봤던 게 또 보이네??*** 🥲

이런 단점을 보완한 페이징 기법이 있습니다.

---

### Cursor based 페이징

cusor paing의 경우 이름에서 유추 할 수 있듯이 커서로 무언가를 가르켜 페이징을 하는 방법입니다.

여기서 커서는? ***마지막으로 조회한 콘텐츠입니다.***

<aside>
📢 **마지막으로 조회한 대상 그 다음부터 가져와!**

</aside>

이렇게 생각하면 됩니다.

이제 cursor paing 쿼리의 예시를 보여드릴게요.

cursor paging은 조금 더 어렵습니다. (파이팅!)

마지막으로 조회한 책의 좋아요가 20이라면 (물론 예시여서 좋아요 칼럼이 있다고 한 거에요!)

```sql
select * from book where book.likes < 20 order by likes desc limit 15;
```

이런 형태이며 실제로는 저렇게 보다는 마지막으로 조회한 책의 아이디를 가져와서

```sql
select * from book where book.likes < 
		(select likes from book where id = 4)
			order by likes desc limit 15;
```

이런 형태의 쿼리가 됩니다.

이제 책 목록 조회 쿼리를 커서 페이징으로 해보겠습니다.

```sql
select * from book where created_at < 
	(select created_at from book where id = 3)
		order by created_at desc limit 15;
```

이번에는 인기순 커서 페이징 입니다.

```sql
select * from book as b
	 join (select count(*) as like_count 
					from book_likes 
						group by book_id) as likes on b.id = likes.book_id
			where likes.like_count < (select count(*) from book_likes where book_id = 3)
				order by likes.like_count desc limit 15;
```

<aside>
🤔 **❗질문❗**

이 인기 순 커서 페이징 쿼리가 과연 **잘 작동할까요?** 

</aside>

**아뇨,**

<aside>
🔥 이유는, 예를 들어 **좋아요가 0개인 게시글이 400개**이고,
**공교롭게 마지막으로 조회한 책의 좋아요가 0개**라면,
그리고 **아직 뒤에 조회를 하지 않은 책**이 있다면

**다음 페이지에 책이 목록으로 조회가 될까요?**

</aside>

***이런 경우가 있기에 인기 순 정렬 같이 같은 값이 있을 수 있는 경우***

***정렬 기준이 하나 더 있어야 합니다.***

따라서 위의 예시에서 좋아요 수가 같을 경우 PK값을 정렬 기준을 추가해보겠습니다.

```sql
select * from book as b
	 join (select count(*) as like_count 
						from book_likes
							group by book_id) as likes on b.id = likes.book_id
			where likes.like_count < (select count(*) from book_likes where book_id = 3)
				order by likes.like_count desc, b.id desc limit 15;
```

이러면 성공 한 걸까요?

이 경우 에도 정렬 기준이 추가 된것 일 뿐

좋아요 갯수가 같은 book이 15개가 넘어가면 그 이상의 것은 무시가 됩니다.

둘의 조건을 한번에 분류할 수 있는 기준이 필요합니다.

밑에 것은 두 조건을 한번에 cursor 값으로 지정할 수 있는 코드입니다.

좋아요 갯수와, id를 하나의 문자열로 엮어서 cursor 값이 완전히 고유한 값이라고 볼 수 있습니다. (MySQL을 기준으로 썼고 SQL마다 문법이 조금씩 다를 수 있습니다.) (10자리를 기준으로 엮은 것이고 더 길어질 수도 있습니다.)

```sql
SELECT b.*,
       CONCAT(LPAD(likes.like_count, 10, '0'), LPAD(b.id, 10, '0')) AS cursor_value
FROM book AS b
JOIN (SELECT book_id, COUNT(*) AS like_count
      FROM book_likes
      GROUP BY book_id) AS likes ON b.id = likes.book_id
HAVING cursor_value < (SELECT CONCAT(LPAD(like_count_sub.like_count, 10, '0'), LPAD(like_count_sub.book_id, 10, '0'))
                FROM (SELECT book_id, COUNT(*) AS like_count
                      FROM book_likes
                      GROUP BY book_id) AS like_count_sub
                WHERE like_count_sub.book_id = 3) # 여기에 cursor_value 값이 들어가면 됨.
ORDER BY likes.like_count DESC, b.id DESC
LIMIT 15;
```

cursor_value를 위해 having을 썼지만 집계 함수를 쓰지 않고 having 절을 쓰기는 조금 비 효율적 일 수 있으니

where 절로 구현한다면 이렇게 할 수도 있겠네요.

```sql
SELECT b.*,
       CONCAT(LPAD(likes.like_count, 10, '0'), LPAD(b.id, 10, '0')) AS cursor_value
FROM book AS b
JOIN (SELECT book_id, COUNT(*) AS like_count
      FROM book_likes
      GROUP BY book_id) AS likes ON b.id = likes.book_id
WHERE CONCAT(LPAD(likes.like_count, 10, '0'), LPAD(b.id, 10, '0')) < 
      (SELECT CONCAT(LPAD(like_count_sub.like_count, 10, '0'), LPAD(like_count_sub.book_id, 10, '0'))
       FROM (SELECT book_id, COUNT(*) AS like_count
             FROM book_likes
             GROUP BY book_id) AS like_count_sub
       WHERE like_count_sub.book_id = 3) # 여기에 cursor_value 값이 들어가면 됨.
ORDER BY likes.like_count DESC, b.id DESC
LIMIT 15;

```

마지막 코드의 경우 실제 서버 구현 때는 cursor 값을 그대로 받는 것이 아닌 정렬 기준이 되는 값들을 받아서 cursor 값을 만들어 적용시키면 더욱 좋을 것 같습니다! (또한 PK 값은 보통 Long으로 설정되는 경우가 많으니 너무 값이 커질 수 있어서 생성 시간과 같은 것으로 해도 좋을 것 같습니다!)

마지막 커서 기반 페이지네이션 SQL문이 너무 어려워 보인다면 참고 자료에 잘 설명된 블로그 글을 첨부해놓았으니 확인바랍니다.

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