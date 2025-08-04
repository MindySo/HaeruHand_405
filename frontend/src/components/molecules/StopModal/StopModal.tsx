import type { FC } from 'react';
import theme from '../../../theme';
import { Text } from '../../atoms';
import closeButtonImg from '../../../../public/closeButtonGray.png';
import styles from './StopModal.module.css';

// 모달 닫기 버튼 props
interface InfoModalProps {
  onClose: () => void;
}

export const StopModal: FC<InfoModalProps> = ({ onClose }) => {
  return (
    <div className={styles.modalWindow}>
      {/* 
        1. 닫기 버튼
        => 상위 컴포넌트에 열고 닫는 state 만들어줘야 함! (개인 노션 참고해서 로직 만들기)  
      */}
      <div className={styles.closeModal} onClick={onClose}>
        <img src={closeButtonImg} alt="close" style={{ display: 'block' }} />
      </div>

      {/* 2. 안내 문구 */}
      <Text className="stopGuide" style={{ margin: theme.spacing.md }} align="center" size="xxl">
        해루질을 마무리할까요?
      </Text>

      {/* 3. 그만하기 버튼 */}
      <button className={styles.stopButton}>그만하기</button>
    </div>
  );
};
