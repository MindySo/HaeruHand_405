export interface BanRule {
  species: string; // 어종
  start: string; // 금어기 시작 (MM-DD)
  end: string; // 금어기 종료 (MM-DD)
  note?: string; // 금어기 비고(지역 조건 등)
  minLength?: string; // 금지체장 (예: '20cm')
  minWeight?: string; // 금지체중 (예: '600g')
  minNote?: string; // 금지체장 및 체중에 대한 비고
}

export const banData: BanRule[] = [
  {
    species: '대구',
    start: '01-16',
    end: '02-15',
    minLength: '35cm 이하',
  },
  {
    species: '문치가자미',
    start: '12-01',
    end: '01-31',
    minLength: '20cm 이하',
  },
  {
    species: '연어',
    start: '10-01',
    end: '11-30',
  },
  {
    species: '전어',
    start: '05-01',
    end: '07-15',
    note: '전국(강원특별자치도 및 경상북도 제외)',
  },
  {
    species: '쥐노래미',
    start: '11-01',
    end: '12-31',
    note: '주3)의 해역은 11월 15일부터 12월 14일까지',
    minLength: '20cm 이하',
  },
  {
    species: '참홍어',
    start: '06-01',
    end: '07-15',
    minLength: '체반폭 42cm 이하',
  },
  {
    species: '참조기',
    start: '07-01',
    end: '07-31',
    note: '근해자망어업중유자망(유동성그물)은 04-22 ~ 08-10',
    minLength: '15cm 이하',
    minNote: '20% 미만 포획 시 제외',
  },
  {
    species: '갈치',
    start: '07-01',
    end: '07-31',
    note: '북위 33도00분00초 이북 해역',
    minLength: '항문장 18cm 이하',
    minNote: '20% 미만 포획 시 제외',
  },
  {
    species: '고등어',
    start: '04-01',
    end: '06-30',
    note: '기간 중 1개월, 해양수산부장관 고시',
    minLength: '21cm 이하',
    minNote: '20% 미만 포획 시 제외',
  },
  {
    species: '말쥐치',
    start: '05-01',
    end: '07-31',
    note: '정치망어업, 연안어업 및 구획어업은 06-01 ~ 07-31',
    minLength: '18cm 이하',
  },
  {
    species: '옥돔',
    start: '07-21',
    end: '08-20',
  },
  {
    species: '명태',
    start: '01-01',
    end: '12-31',
  },
  {
    species: '삼치',
    start: '05-01',
    end: '05-31',
  },
  {
    species: '감성돔',
    start: '05-01',
    end: '05-31',
    minLength: '25cm 이하',
  },
  {
    species: '꽃게',
    start: '06-01',
    end: '09-30',
    note: '기간 중 2개월, 해양수산부장관 고시',
    minLength: '두흉갑장 6.4cm 이하',
  },
  {
    species: '대게류(붉은대게 제외)',
    start: '06-01',
    end: '11-30',
    note: '동경131도30분 이동수역은 06-01 ~ 10-31 / 기타',
    minLength: '두흉갑장 9cm 이하',
  },
  {
    species: '붉은대게',
    start: '07-10',
    end: '08-25',
    note: '강원특별자치도 연안자망어업은 06-01 ~ 07-10',
  },
  {
    species: '대하',
    start: '05-01',
    end: '06-30',
  },
  {
    species: '새조개',
    start: '06-16',
    end: '09-30',
    note: '부산, 울산, 경남, 전남(무안·영광 제외) 및 제주는 06-01 ~ 09-30',
  },
  {
    species: '소라',
    start: '06-01',
    end: '08-31',
    note: '제주특별자치도(추자도 제외)',
    minLength: '7cm 이하',
    minNote: '각고 5cm 이하. 제주도 및 경북 울릉도·독도산은 7cm 이하',
  },
  {
    species: '소라(추자도)',
    start: '07-01',
    end: '08-31',
    note: '제주특별자치도 제주시 추자면 추자도',
    minLength: '7cm 이하',
  },
  {
    species: '소라',
    start: '06-01',
    end: '07-31',
    note: '경상북도 울릉군 울릉도와 독도',
    minLength: '제주도 7cm 이하',
    minNote: '각고 5cm 이하. 제주도 및 경북 울릉도·독도산은 7cm 이하',
  },
  {
    species: '전복류',
    start: '09-01',
    end: '10-31',
    note: '제주특별자치도는 10-01 ~ 12-31',
  },
  {
    species: '전복류(제주도)',
    start: '10-01',
    end: '12-31',
  },
  {
    species: '코끼리조개',
    start: '05-01',
    end: '06-30',
    note: '강원특별자치도와 경상북도 한정',
  },
  {
    species: '키조개',
    start: '07-01',
    end: '08-31',
    minLength: '각장 18cm 이하',
    minNote: '부산, 울산, 강원특별자치도, 경상북도 및 경상남도산 한정',
  },
  {
    species: '가리비',
    start: '03-01',
    end: '06-30',
    note: '주7)의 해역',
  },
  {
    species: '오분자기',
    start: '07-01',
    end: '08-31',
    note: '제주특별자치도 한정',
    minLength: '각장 4cm 이하',
    minNote: '제주특별자치도산 한정',
  },
  {
    species: '넓미역',
    start: '09-01',
    end: '11-30',
    note: '제주특별자치도 한정',
  },
  {
    species: '우뭇가사리',
    start: '11-01',
    end: '03-31',
  },
  {
    species: '톳',
    start: '10-01',
    end: '01-31',
  },
  {
    species: '해삼',
    start: '07-01',
    end: '07-31',
  },
  {
    species: '살오징어',
    start: '04-01',
    end: '05-31',
    note: '근해채낚기·연안복합·정치망은 04-01 ~ 04-30',
    minLength: '외투장 15cm 이하',
    minNote: ' 20% 미만 포획 시 제외',
  },
  {
    species: '낙지',
    start: '06-01',
    end: '06-30',
    note: '시·도지사 고시 기간(04-01 ~ 09-30 중 1개월 이상)',
  },
  {
    species: '주꾸미',
    start: '05-11',
    end: '08-31',
  },
  {
    species: '참문어',
    start: '05-16',
    end: '06-30',
    note: '시·도지사 고시 기간(05-01 ~ 09-15 중 46일 이상)',
  },
];
