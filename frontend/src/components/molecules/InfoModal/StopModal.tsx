import type { FC } from 'react';
import theme from '../../../theme';
import { Button, Text } from '../../atoms';
import closeButtonImg from './closeButtonGray.png';

// 모달 닫기 버튼 props
interface InfoModalProps {
  onClose: () => void;
}

export const StopModal: FC<InfoModalProps> = ({ onClose }) => {
  return (
    <div
      className="modalWindow"
      style={{
        // 닫기 버튼을 위해 relative로 했지만, 이로 인해 Chaeeun.tsx 페이지에서 해당 모달이 좌측 정렬됨
        // 어차피 두 모달을 동시에 띄우지는 않을테니, 큰 상관은 없을 듯
        // 필요하다면 두 모달의 최상위 모달 modalWindow에 부모 모달을 하나 더 만들어 중앙 정렬 flex 박스로 만들기!
        position: 'relative',

        backgroundColor: theme.colors.lightGray, // 안보여서 임시로 색 설정 -> 추후 white로 변경 예정
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.xl,
        // 모달 창 크기(고정)
        width: 360,
        height: 150,
      }}
    >
      {/* 
        1. 닫기 버튼
        => 상위 컴포넌트에 열고 닫는 state 만들어줘야 함! (개인 노션 참고해서 로직 만들기)  
      */}
      <div
        className="closeModal"
        style={{
          cursor: 'pointer',
          // 버튼 위치 조절
          position: 'absolute',
          top: theme.spacing.sm,
          right: theme.spacing.sm,
          // 버튼 크기 조절
          width: 25,
          height: 25,
        }}
        onClick={onClose}
      >
        <img src={closeButtonImg} alt="close" style={{ display: 'block' }} />
      </div>

      {/* 2. 안내 문구 */}
      <Text className="stopGuide" style={{ margin: theme.spacing.md }} align="center" size="xxl">
        해루질을 마무리할까요?
      </Text>

      {/* 3. 그만하기 버튼 */}
      <Button className="stopButton" variant="error" size="large">
        {/* 버튼에 스타일을 줄 수가 없어 가로로 창을 채운 버튼 만들기 불가 */}
        그만하기
      </Button>
    </div>
  );
};
