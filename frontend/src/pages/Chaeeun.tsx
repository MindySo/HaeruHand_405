import { InfoModal } from '../components/molecules/InfoModal/InfoModal';
import { StopModal } from '../components/molecules/StopModal/StopModal';

const Chaeeun = () => {
  return (
    <div>
      <div>Chaeeun</div>
      {/* 상위 컴포넌트에 모달 창을 열고 닫는 state를 만들어줘야 아래 밑줄 안 생김 */}
      <InfoModal />
      <StopModal />
    </div>
  );
};

export default Chaeeun;
