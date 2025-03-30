USE lucas;

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
LIMIT 10 OFFSET 0;
    

INSERT INTO review (member_id, store_id, body, score)
VALUES (1, 10, '정말 맛있어요!', 5.0);

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
    
-- CREATE TABLE `member` (
--    `id` bigint NOT NULL,
--    `name` varchar(20) NULL,
--    `gender` varchar(10) NULL,
--    `age` int NULL,
--    `address` varchar(40) NULL,
--    `spec_address` varchar(40) NULL,
--    `status` varchar(15) NULL,
--    `inactive_date` datetime NULL,
--    `social_type` varchar(10) NULL,
--    `created_at` datetime(6) NULL,
--    `updated_at` datetime(6) NULL,
--    `email` varchar(50) NULL,
--    `point` int NULL
-- );
--
-- CREATE TABLE `member_agree` (
-- 	`id`	bigint	NOT NULL,
-- 	`member_id`	bigint	NOT NULL,
-- 	`terms_id`	bigint	NOT NULL,
-- 	`created_at`	datetime(6)	NULL,
-- 	`updated_at`	datetime(6)	NULL
-- );
--
-- CREATE TABLE `terms` (
-- 	`id`	bigint	NOT NULL,
-- 	`title`	varchar(20)	NULL,
-- 	`body`	text	NULL,
-- 	`optional`	boolean	NULL,
-- 	`created_at`	datetime(6)	NULL,
-- 	`updated_at`	datetime(6)	NULL
-- );
--
-- CREATE TABLE `member_prefer` (
-- 	`id`	bigint	NOT NULL,
-- 	`member_id`	bigint	NOT NULL,
-- 	`category_id`	bigint	NOT NULL,
-- 	`created_at`	datetime(6)	NULL,
-- 	`updated_at`	datetime(6)	NULL
-- );
--
-- CREATE TABLE `food_category` (
-- 	`id`	bigint	NOT NULL,
-- 	`name`	varchar(15)	NULL,
-- 	`created_at`	datetime(6)	NULL,
-- 	`Column4`	datetime(6)	NULL
-- );
--
-- CREATE TABLE `review` (
-- 	`id`	bigint	NOT NULL,
-- 	`member_id`	bigint	NOT NULL,
-- 	`store_id`	bigint	NOT NULL,
-- 	`body`	text	NULL,
-- 	`score`	float	NULL
-- );
--
-- CREATE TABLE `member_mission` (
-- 	`id`	bigint	NOT NULL,
-- 	`member_id`	bigint	NOT NULL,
-- 	`mission_id`	bigint	NOT NULL,
-- 	`status`	varchar(15)	NULL,
-- 	`created_at`	datetime(6)	NULL,
-- 	`updated_at`	datetime(6)	NULL
-- );
--
-- CREATE TABLE `mission` (
-- 	`id`	bigint	NOT NULL,
-- 	`reward`	bigint	NULL,
-- 	`deadline`	datetime	NULL,
-- 	`mission_spec`	text	NULL,
-- 	`created_at`	datetime(6)	NULL,
-- 	`updated_at`	datetime(6)	NULL
-- );
--
-- CREATE TABLE `region` (
-- 	`id`	bigint	NOT NULL,
-- 	`name`	varchar(20)	NULL,
-- 	`created_at`	datetime(6)	NULL,
-- 	`updated_at`	datetime(6)	NULL
-- );
--
-- CREATE TABLE `store` (
-- 	`id`	bigint	NOT NULL,
-- 	`region_id`	bigint	NOT NULL,
-- 	`name`	varchar(50)	NULL,
-- 	`address`	varchar(50)	NULL,
-- 	`score`	float	NULL,
-- 	`created_at`	datetime(6)	NULL,
-- 	`updated_at`	datetime(6)	NULL
-- );
--
-- CREATE TABLE `review_image` (
-- 	`id`	bigint	NOT NULL,
-- 	`review_id`	bigint	NOT NULL,
-- 	`image_url`	text	NULL,
-- 	`created_at`	datetime(6)	NULL,
-- 	`updated_at`	datetime(6)	NULL,
-- 	`Field`	VARCHAR(255)	NULL
-- );
--
-- ALTER TABLE `member` ADD CONSTRAINT `PK_MEMBER` PRIMARY KEY (
-- 	`id`
-- );
--
-- ALTER TABLE `member_agree` ADD CONSTRAINT `PK_MEMBER_AGREE` PRIMARY KEY (
-- 	`id`,
-- 	`member_id`,
-- 	`terms_id`
-- );
--
-- ALTER TABLE `terms` ADD CONSTRAINT `PK_TERMS` PRIMARY KEY (
-- 	`id`
-- );
--
-- ALTER TABLE `member_prefer` ADD CONSTRAINT `PK_MEMBER_PREFER` PRIMARY KEY (
-- 	`id`,
-- 	`member_id`,
-- 	`category_id`
-- );
--
-- ALTER TABLE `food_category` ADD CONSTRAINT `PK_FOOD_CATEGORY` PRIMARY KEY (
-- 	`id`
-- );
--
-- ALTER TABLE `review` ADD CONSTRAINT `PK_REVIEW` PRIMARY KEY (
-- 	`id`,
-- 	`member_id`,
-- 	`store_id`
-- );
--
-- ALTER TABLE `member_mission` ADD CONSTRAINT `PK_MEMBER_MISSION` PRIMARY KEY (
-- 	`id`,
-- 	`member_id`,
-- 	`mission_id`
-- );
--
-- ALTER TABLE `mission` ADD CONSTRAINT `PK_MISSION` PRIMARY KEY (
-- 	`id`
-- );
--
-- ALTER TABLE `region` ADD CONSTRAINT `PK_REGION` PRIMARY KEY (
-- 	`id`
-- );
--
-- ALTER TABLE `store` ADD CONSTRAINT `PK_STORE` PRIMARY KEY (
-- 	`id`,
-- 	`region_id`
-- );
--
-- ALTER TABLE `review_image` ADD CONSTRAINT `PK_REVIEW_IMAGE` PRIMARY KEY (
-- 	`id`,
-- 	`review_id`
-- );
--
-- ALTER TABLE `member_agree` ADD CONSTRAINT `FK_member_TO_member_agree_1` FOREIGN KEY (
-- 	`member_id`
-- )
-- REFERENCES `member` (
-- 	`id`
-- );
--
-- ALTER TABLE `member_agree` ADD CONSTRAINT `FK_terms_TO_member_agree_1` FOREIGN KEY (
-- 	`terms_id`
-- )
-- REFERENCES `terms` (
-- 	`id`
-- );
--
-- ALTER TABLE `member_prefer` ADD CONSTRAINT `FK_member_TO_member_prefer_1` FOREIGN KEY (
-- 	`member_id`
-- )
-- REFERENCES `member` (
-- 	`id`
-- );
--
-- ALTER TABLE `member_prefer` ADD CONSTRAINT `FK_food_category_TO_member_prefer_1` FOREIGN KEY (
-- 	`category_id`
-- )
-- REFERENCES `food_category` (
-- 	`id`
-- );
--
-- ALTER TABLE `review` ADD CONSTRAINT `FK_member_TO_review_1` FOREIGN KEY (
-- 	`member_id`
-- )
-- REFERENCES `member` (
-- 	`id`
-- );
--
-- ALTER TABLE `review` ADD CONSTRAINT `FK_store_TO_review_1` FOREIGN KEY (
-- 	`store_id`
-- )
-- REFERENCES `store` (
-- 	`id`
-- );
--
-- ALTER TABLE `member_mission` ADD CONSTRAINT `FK_member_TO_member_mission_1` FOREIGN KEY (
-- 	`member_id`
-- )
-- REFERENCES `member` (
-- 	`id`
-- );
--
-- ALTER TABLE `member_mission` ADD CONSTRAINT `FK_mission_TO_member_mission_1` FOREIGN KEY (
-- 	`mission_id`
-- )
-- REFERENCES `mission` (
-- 	`id`
-- );
--
-- ALTER TABLE `store` ADD CONSTRAINT `FK_region_TO_store_1` FOREIGN KEY (
-- 	`region_id`
-- )
-- REFERENCES `region` (
-- 	`id`
-- );
--
-- ALTER TABLE `review_image` ADD CONSTRAINT `FK_review_TO_review_image_1` FOREIGN KEY (
-- 	`review_id`
-- )
-- REFERENCES `review` (
-- 	`id`
-- );
