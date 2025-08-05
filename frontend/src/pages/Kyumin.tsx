import { InfoButton, WeatherWidgets } from '../components/molecules';
import HarvestButton from '../components/molecules/HarvestButton/HarvestButton';
import TrackingButton from '../components/molecules/TrackingButton/TrackingButton';
import WarningBanner from '../components/molecules/WarningBanner/WarningBanner';

const Kyumin = () => {
  return (
    <div>
      <HarvestButton />
      <TrackingButton />
      <InfoButton />
      <WarningBanner type="호우주의보" date="2025-08-05" location="서울" />
      <WeatherWidgets
        items={[
          {
            icon: (
              <img src="/sunIcon.svg" alt="태양 아이콘" style={{ width: '24px', height: '24px' }} />
            ),
            subtitle: '현재 날씨',
            data: '32.7℃ / 맑음',
          },
          {
            icon: (
              <img src="/normal.svg" alt="위험도 보통" style={{ width: '24px', height: '24px' }} />
            ),
            subtitle: '위험도',
            data: '보통',
          },
        ]}
      />
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
              <img src="/seaTemp.svg" alt="수온 아이콘" style={{ width: '24px', height: '24px' }} />
            ),
            subtitle: '현재 수온',
            data: '22.7℃',
          },
        ]}
      />
    </div>
  );
};

export default Kyumin;
