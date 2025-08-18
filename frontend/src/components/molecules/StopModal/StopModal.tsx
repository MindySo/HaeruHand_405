import type { FC } from 'react';
import theme from '../../../theme';
import { Text } from '../../atoms';
import styles from './StopModal.module.css';

// 모달 닫기 버튼 props
interface InfoModalProps {
  onClose: () => void;
}

export const StopModal: FC<InfoModalProps> = ({ onClose }) => {
  return (
    <div>
      {/* 오버레이(화면 전체를 덮는 흐린 배경 및 클릭 시 모달 닫기) */}
      <div className={styles.overlay} onClick={onClose} />

      {/* 모달 창 */}
      <div className={styles.modalWindow}>
        {/* 
        1. 닫기 버튼
        => 상위 컴포넌트에 열고 닫는 state 만들어줘야 함! (개인 노션 참고해서 로직 만들기)  
        */}
        <div className={styles.closeButton} onClick={onClose}>
          <img src="/closeButtonGray.svg" alt="닫기" className={styles.closeButtonIcon} />
        </div>

        <div className={styles.content}>
          {/* 2. 안내 문구 */}
          <Text
            className="stopGuide"
            style={{ margin: theme.spacing.md, paddingTop: theme.spacing.lg }}
            align="center"
            size="xxl"
          >
            해루질을 마무리할까요?
          </Text>

          {/* 3. 그만하기 버튼 */}
          <button className={styles.stopButton}>그만하기</button>
        </div>
      </div>
    </div>
  );
};
