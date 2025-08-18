-- 제주도 유어장 데이터 INSERT
-- Law announcement : 2023-11-07
-- created_at, updated_at은 @CreatedDate, @LastModifiedDate에서 자동 설정
-- is_deleted는 BaseEntity에서 기본값 false로 자동 설정

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_results = utf8mb4;
SET collation_connection = utf8mb4_unicode_ci;

USE haeruhand;

TRUNCATE TABLE fish_restriction;

INSERT INTO fish_restriction (
    species_name,
    restriction_region,
    restriction_start_date,
    restriction_end_date,
    minimum_length_centimeter,
    minimum_weight_gram,
    measurement_type,
    law_announcement_date,
    note,
    image_url
) VALUES

-- 금어기가 있는 어종들
('명태', 'NATIONAL', '2025-01-01', '2025-12-31', NULL, NULL, NULL, '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/Alaskapollack.jpg'),
('대구', 'NATIONAL', '2025-01-16', '2025-02-15', 35.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/pacificCod.jpg'),
('가리비', 'NATIONAL', '2025-03-01', '2025-06-03', NULL, NULL, NULL, '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/Scallop.jpg'),
('살오징어', 'NATIONAL', '2025-04-01', '2025-05-31', 15.00, NULL, 'OUTER_MANTLE_LENGTH', '2021-01-01', '단, 근해채낚기, 연안복합, 정치망 4.1 ~ 4.30', 'https://storage.googleapis.com/haeruhand-ai/dictionary/JapaneseCommonSquid.jpg'),
('고등어', 'NATIONAL', '2025-04-01', '2025-06-30', 21.00, NULL, 'TOTAL_LENGTH', '2021-01-01', '금어기 중 1개월(수산자원의 포획금지 금지기간에 관한 고시)', 'https://storage.googleapis.com/haeruhand-ai/dictionary/CommonMackerel.jpg'),
('감성돔', 'NATIONAL', '2025-05-01', '2025-05-31', 25.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/blackPorgy.jpg'),
('삼치', 'NATIONAL', '2025-05-01', '2025-05-31', NULL, NULL, NULL, '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/SpanishMackerel%20.jpg'),
('참문어', 'NATIONAL', '2025-05-16', '2025-06-30', NULL, NULL, NULL, '2021-01-01', '시·도지사는 5.1~9.15 중 46일 이상 지정 가능', 'https://storage.googleapis.com/haeruhand-ai/dictionary/OctopusVulgaris.jpg'),
('대하', 'NATIONAL', '2025-05-01', '2025-06-30', NULL, NULL, NULL, '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/fleshyPrawn.jpg'),
('전어', 'NATIONAL', '2025-05-01', '2025-07-15', NULL, NULL, NULL, '2021-01-01', '단, 강원, 경북 제외', 'https://storage.googleapis.com/haeruhand-ai/dictionary/gizzardShad.jpg'),
('말쥐치', 'NATIONAL', '2025-05-01', '2025-07-31', 18.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/blackScraper.jpg'),
('주꾸미', 'NATIONAL', '2025-05-11', '2025-08-31', NULL, NULL, NULL, '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/WebfootOctopus.jpg'),
('낙지', 'NATIONAL', '2025-06-01', '2025-06-30', NULL, NULL, NULL, '2021-01-01', '시·도지사는 4.1~9.30 중 1개월 이상 지정 가능', 'https://storage.googleapis.com/haeruhand-ai/dictionary/OctopusMinor.jpg'),
('참홍어', 'NATIONAL', '2025-06-01', '2025-07-15', 42.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/MottledSkate.jpg'),
('꽃게', 'NATIONAL', '2025-06-21', '2025-08-20', 6.40, NULL, 'CARAPACE_WIDTH', '2021-01-01', '단, 연평 7.1~8.31/백령, 대청, 소청 7.16~9.15. 수산자원의 포획금지기간에 관한 고시', 'https://storage.googleapis.com/haeruhand-ai/dictionary/SwimmingCrab.jpg'),
('소라', 'NATIONAL', '2025-06-01', '2025-08-31', 7.00, NULL, 'SHELL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/SeaSnail.jpg'),
('새조개', 'NATIONAL', '2025-06-01', '2025-09-30', NULL, NULL, NULL, '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/EggCockle.jpg'),
('대게', 'NATIONAL', '2025-06-01', '2025-11-30', 9.00, NULL, 'CARAPACE_WIDTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/TannerCrab.jpg'),
('갈치', 'NATIONAL', '2025-07-01', '2025-07-31', 18.00, NULL, 'ANAL_LENGTH', '2021-01-01', '근해채낚기, 연안복합 제외', 'https://storage.googleapis.com/haeruhand-ai/dictionary/Hairtail.jpg'),
('참조기', 'NATIONAL', '2025-07-01', '2025-07-31', 15.00, NULL, 'TOTAL_LENGTH', '2021-01-01', '단, 유자망 4.22∼8.10', 'https://storage.googleapis.com/haeruhand-ai/dictionary/YellowCroaker.jpg'),
('해삼', 'NATIONAL', '2025-07-01', '2025-07-31', NULL, NULL, NULL, '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/SeaCucumber.jpg'),
('오분자기', 'NATIONAL', '2025-07-01', '2025-08-31', 4.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/EarShell.jpg'),
('키조개', 'NATIONAL', '2025-07-01', '2025-08-31', NULL, NULL, 'SHELL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/CombPenShell.jpg'),
('붉은대게', 'NATIONAL', '2025-07-10', '2025-08-25', NULL, NULL, NULL, '2021-01-01', '단, 강원 연안자망 6.1∼7.10', 'https://storage.googleapis.com/haeruhand-ai/dictionary/RedSnowCrab.jpg'),
('옥돔', 'NATIONAL', '2025-07-21', '2025-08-20', NULL, NULL, NULL, '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/HorseHeadFish.jpg'),
('전복류', 'NATIONAL', '2025-10-01', '2025-12-31', 10.00, NULL, 'SHELL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/Abalone.jpg'),
('넓미역', 'NATIONAL', '2025-09-01', '2025-11-30', NULL, NULL, NULL, '2021-01-01', '단, 제주도 고시로 5.1~11.30 중 3개월 이상 지정 가능', 'https://storage.googleapis.com/haeruhand-ai/dictionary/UndariaPeterseniana.jpg'),
('연어', 'NATIONAL', '2025-10-01', '2025-11-30', NULL, NULL, NULL, '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/ChumSalmon.jpg'),
('톳', 'NATIONAL', '2025-10-01', '2026-01-31', NULL, NULL, NULL, '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/SeaWeedFusiforme.jpg'),
('쥐노래미', 'NATIONAL', '2025-11-01', '2025-12-31', 20.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/Greenling.jpg'),
('우뭇가사리', 'NATIONAL', '2025-11-01', '2026-03-31', NULL, NULL, NULL, '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/Agar.jpg'),
('문치가자미', 'NATIONAL', '2025-12-01', '2026-01-31', 20.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/MarbledFlounder.jpg'),

-- 체장 제한만 있는 어종들 (연중 적용)
('기름가자미', 'NATIONAL', '2025-01-01', '2025-12-31', 20.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/BlackfinFlounder.jpg'),
('기수재첩', 'NATIONAL', '2025-01-01', '2025-12-31', 1.50, NULL, 'SHELL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/marshClam.jpg'),
('갯장어', 'NATIONAL', '2025-01-01', '2025-12-31', 40.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/DaggertoothPikeConger.jpg'),
('넙치(광어)', 'NATIONAL', '2025-01-01', '2025-12-31', 35.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/Flatfish.jpg'),
('농어', 'NATIONAL', '2025-01-01', '2025-12-31', 30.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/SeaBass.jpg'),
('도루묵', 'NATIONAL', '2025-01-01', '2025-12-31', 11.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/SailfinSandfish.jpg'),
('대문어', 'NATIONAL', '2025-01-01', '2025-12-31', NULL, 600.0, NULL, '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/Ocopus.jpg'),
('돌돔', 'NATIONAL', '2025-01-01', '2025-12-31', 24.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/StripedBeakperch.jpg'),
('미거지', 'NATIONAL', '2025-01-01', '2025-12-31', 40.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/LiparisIngens.jpg'),
('민어', 'NATIONAL', '2025-01-01', '2025-12-31', 33.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/BrownCroaker.png'),
('방어', 'NATIONAL', '2025-01-01', '2025-12-31', 30.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/Yellowtail.jpg'),
('볼락', 'NATIONAL', '2025-01-01', '2025-12-31', 15.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/BlackRockFish.jpg'),
('붕장어', 'NATIONAL', '2025-01-01', '2025-12-31', 35.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/CommonConger.jpg'),
('용가자미', 'NATIONAL', '2025-01-01', '2025-12-31', 20.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/PointheadFlounder.jpg'),
('조피볼락(우럭)', 'NATIONAL', '2025-01-01', '2025-12-31', 23.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/KoreanRockfish.jpg'),
('참가자미', 'NATIONAL', '2025-01-01', '2025-12-31', 20.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/Flounder.jpg'),
('참돔', 'NATIONAL', '2025-01-01', '2025-12-31', 24.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/RedSeabream.jpg'),
('청어', 'NATIONAL', '2025-01-01', '2025-12-31', 20.00, NULL, 'TOTAL_LENGTH', '2021-01-01', NULL, 'https://storage.googleapis.com/haeruhand-ai/dictionary/PacificHerring.jpg');