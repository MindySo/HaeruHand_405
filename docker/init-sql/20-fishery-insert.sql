-- 제주도 유어장 데이터 INSERT
-- created_at, updated_at은 @CreatedDate, @LastModifiedDate에서 자동 설정
-- is_deleted는 BaseEntity에서 기본값 false로 자동 설정

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_results = utf8mb4;
SET collation_connection = utf8mb4_unicode_ci;

USE haeruhand;

DELETE FROM fishery;

INSERT INTO fishery (name, address, latitude, longitude, station_code, region_code, area_name)
VALUES ('구업어촌계유어장', '제주시 애월읍 애월해안로 715-1', 33.484180, 126.377371, 'DT_0004', 'S1323100', '제주북서'),
       ('고내어촌계유어장', '제주시 애월읍 고내리 1158', 33.467116, 126.336516, 'DT_0004', 'S1323100', '제주북서'),
       ('애월어촌계유어장(애월스쿠버)', '제주시 애월읍 13길 45', 33.466124, 126.321545, 'DT_0004', 'S1323100', '제주북서'),
       ('애월어촌계유어장(오션캠프)', '제주시 애월읍 애월해안로 93', 33.466447, 126.324428, 'DT_0004', 'S1323100', '제주북서'),
       ('수원어촌계유어장', '제주시 한림읍 한림로 782-6', 33.423654, 126.267283, 'SO_1277', 'S1323400', '제주북서');