-- ------------------------------------------------------------
--  File: fish_restriction_seed.sql
--  Purpose : Seed data for fish_restriction table
--  Law announcement : 2024-05-28  (수산자원관리법 시행령 개정)
-- ------------------------------------------------------------

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
-- 1. 감성돔 – 5 월 산란기 보호 (전장 25 cm 이상)
('감성돔', 'NATIONAL', '2024-05-01', '2024-05-31',
 25.00, NULL, 'TOTAL_LENGTH', '2024-05-28', NULL, NULL),
-- 2. 꽃게 – 두흉갑장 6.4 cm 이상, 여름 금어기
('꽃게',   'NATIONAL', '2024-06-21', '2024-08-20',
 6.40, NULL, 'CARAPACE_WIDTH', '2024-05-28',
 '연평 7.1~8.31 / 백령·대청·소청 7.16~9.15 지역 특례', NULL),
-- 3. 갈치 – 항문장 18 cm 이상
('갈치',   'NATIONAL', '2024-07-01', '2024-07-31',
 18.00, NULL, 'ANAL_LENGTH', '2024-05-28',
 '근해채낚기·연안복합 제외', NULL),
-- 4. 전복류(제주) – 각장 10 cm 이상
('전복류', 'JEJU',     '2024-10-01', '2024-12-31',
 10.00, NULL, 'SHELL_LENGTH', '2024-05-28', NULL, NULL),
-- 5. 참홍어 – 체반폭 42 cm 이상
('참홍어', 'NATIONAL', '2024-06-01', '2024-07-15',
 42.00, NULL, 'BODY_WIDTH',   '2024-05-28', NULL, NULL);
