import { InfoButton, WeatherWidgets } from '../components/molecules';
import HarvestButton from '../components/molecules/HarvestButton/HarvestButton';
import TrackingButton from '../components/molecules/TrackingButton/TrackingButton';
import WarningBanner from '../components/molecules/WarningBanner/WarningBanner';

const Kyumin = () => {
  return (
    <div>
      <WeatherWidgets />
      <HarvestButton />
      <TrackingButton />
      <InfoButton />
      <WarningBanner type="호우주의보" date="2025-08-05" location="서울" />
    </div>
  );
};

export default Kyumin;
