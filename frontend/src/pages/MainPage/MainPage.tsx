import { useState } from 'react';
import { Text } from '../../components/atoms';
import {
  HarvestButton,
  InfoButton,
  TrackingButton,
  WarningBanner,
  WeatherWidgets,
} from '../../components/molecules';
import styles from './MainPage.module.css';
import { InfoModal } from '../../components/molecules/InfoModal/InfoModal';

export const MainPage = () => {
  // 모달 창 띄우기 state
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const openInfoModal = () => setIsInfoModalOpen(true);
  const closeInfoModal = () => setIsInfoModalOpen(false);

  // -------------------------------------------------------------------------------------
  // [메인 페이지 반환]
  return (
    <div className={styles.window}>
      {/* 헤더 */}
      <div className={styles.header}>
        <h1>해루핸 로고</h1>
        <img src="/bell.svg" alt="특보 조회" className={styles.bellIcon} />
      </div>

      {/* 어장 이름(뒤로가기) */}
      <div className={styles.goBack}>
        <img src="/backIcon.svg" alt="뒤로가기" />
        <Text>애월3리 어촌계</Text>
      </div>

      {/* 특보 배너 -> 임시 데이터*/}
      <div className="warningBanner">
        <WarningBanner type="호우주의보" date="08월 06일 22시 00분" location="안양" />
      </div>

      {/* 위젯: 해루 가능 시간, 현재 수온 */}
      <div className={styles.weatherWidgets}>
        <WeatherWidgets
          items={[
            {
              icon: (
                <img src="/wave.svg" alt="파도 아이콘" style={{ width: '24px', height: '24px' }} />
              ),
              subtitle: '해루 가능 시간',
              data: '09:10 ~ 11:00',
            },
            {
              icon: (
                <img
                  src="/seaTemp.svg"
                  alt="수온 아이콘"
                  style={{ width: '24px', height: '24px' }}
                />
              ),
              subtitle: '현재 수온',
              data: '22.7℃',
            },
          ]}
        />
      </div>

      {/* 지도 */}
      <div className={styles.map}></div>

      {/* 수확물 확인하기 */}
      <div className={styles.harvestButton}>
        <HarvestButton />
      </div>

      {/* 버튼: 채집 안내서, 위치 트래킹 */}
      <div className={styles.buttons}>
        {/* 채집 안내서 -> 모달 창 열기 */}
        <InfoButton onClick={openInfoModal} />
        {/* 위치 트래킹 -> 트래핑 페이지 이동 */}
        <TrackingButton />
      </div>

      {/* 채집 안내서 모달(InfoModal) 로직 */}
      {isInfoModalOpen && <InfoModal onClose={closeInfoModal} />}
    </div>
  );
};
