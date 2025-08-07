import { useState, type FC } from 'react';
import theme from '../../../theme';
import { Text } from '../../atoms';
import closeButtonImg from '../../../../public/closeButtonLightGray.png';
import styles from './InfoModal.module.css';

// 모달 닫기 버튼 props
interface InfoModalProps {
  onClose: () => void;
}

// toggle 상태 타입
type ToggleState = 'prohibitedItems' | 'availableTools';

export const InfoModal: FC<InfoModalProps> = ({ onClose }) => {
  // 토글(기본값: 채집 금지 목록) 버튼 상태 관리
  // 채집 금지 목록(prohibitedItems) || 사용 가능 도구(availableTools)
  const [toggle, setToggle] = useState<ToggleState>('prohibitedItems');

  // [토글 버튼] 공통 UI
  interface ToggleItemProps {
    label: string;
    value: ToggleState;
  }

  const ToggleItem: FC<ToggleItemProps> = ({ label, value }) => (
    <div onClick={() => setToggle(value)}>
      <Text
        size="lg"
        style={{
          cursor: 'pointer',
          color: toggle === value ? theme.colors.white : theme.colors.gray,
          backgroundColor: toggle === value ? theme.colors.main : theme.colors.white,
          borderRadius: toggle === value ? theme.borderRadius.md : 'none',
          padding: `1px ${theme.spacing.sm}`,
        }}
      >
        {label}
      </Text>
    </div>
  );

  // [토글1] 채집 금지 목록
  const ProhibitedItemsContent = () => {
    return (
      <div>
        {/* 소제목1 */}
        <Text
          size="md"
          style={{
            padding: theme.spacing.md,
            margin: `${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.xs}`,
            height: '60px',
            flex: '0 0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          보호 중인 친구들이에요, 눈으로만 봐주세요!
        </Text>
        {/* 내용1(목록) -> 추후 데이터 받아올 때 구조 수정 예정 */}
        <div className={styles.list}>
          <p className={styles.listItem}>
            채집 금지 구역 리스트: 길이 테스트 어케 나오려나아아아아
          </p>
          <p className={styles.listItem}>
            채집 금지 구역 리스트: 길이 테스트 어케 나오려나아아아아
          </p>
          <p className={styles.listItem}>
            채집 금지 구역 리스트: 길이 테스트 어케 나오려나아아아아
          </p>
          <li className={styles.listItem}>채집 금지 구역 리스트</li>
          <li className={styles.listItem}>채집 금지 구역 리스트</li>
          <li>채집 금지 구역 리스트</li>
          <li>채집 금지 구역 리스트</li>
          <li>채집 금지 구역 리스트</li>
          <li>채집 금지 구역 리스트</li>
          <li>채집 금지 구역 리스트</li>
          <li>채집 금지 구역 리스트</li>
          <li>채집 금지 구역 리스트</li>
          <li>채집 금지 구역 리스트</li>
          <li>채집 금지 구역 리스트</li>
          <li>채집 금지 구역 리스트</li>
          <li>채집 금지 구역 리스트</li>
          <li>채집 금지 구역 리스트</li>
        </div>
      </div>
    );
  };

  // [토글2] 사용 가능 도구
  const AvailableToolsContent = () => {
    return (
      <div>
        {/* 소제목2 */}
        <Text
          size="md"
          style={{
            padding: theme.spacing.md,
            margin: `${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.xs}`,
            height: '60px',
            flex: '0 0 auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          이건 써도 괜찮아요!
        </Text>
        {/* 내용2(목록) -> static data / 추후 데이터 받아올 때 구조 수정 예정 */}
        <div className={styles.list}>
          <li className={styles.listItem}>사용 가능 도구 리스트</li>
          <li className={styles.listItem}>사용 가능 도구 리스트</li>
          <li className={styles.listItem}>사용 가능 도구 리스트</li>
          <p className={styles.listItem}>
            사용 가능 도구 리스트: 길이 테스트 어케 나오려나아아아아
          </p>
        </div>
      </div>
    );
  };

  // ------------------------------------------------------------------------
  // [반환 값] 모달 창
  return (
    <div>
      {/* 오버레이(화면 전체를 덮는 흐린 배경 및 클릭 시 모달 닫기) */}
      <div className={styles.overlay} onClick={onClose} />

      {/* 모달 창 */}
      <div className={styles.modalWindow}>
        {/* 1. 모달 창 헤더 */}
        {/* 1-1. 창 제목 */}
        <header className={styles.headerTitle}>
          <Text
            style={{
              color: theme.colors.white,
              fontSize: theme.typography.fontSize.xxxl,
              marginBottom: theme.spacing.xs,
            }}
          >
            채집 안내서
          </Text>
        </header>
        {/* 1-2. 닫기 버튼 -> 우 상단에 고정(일단 임시로 png 넣어두었습니다)
          개인 노션 참고해서 닫기 로직 만들기!! */}
        <div
          className={styles.closeModal}
          onClick={onClose}
          // 키보드 접근성
          tabIndex={0} // Tab키로 버튼에 도달 가능
          // 스크린리더 사용자
          role="button"
          aria-label="닫기"
        >
          <img
            src={closeButtonImg}
            alt="close"
            style={{
              // inline 요소인 img 태그를 block 레벨 요소로 변경 -> 레이아웃 및 여백 정리 목적
              display: 'block',
            }}
          />
        </div>

        {/* 2. 모달 창 내부 (헤더 아래) 박스 */}
        <div className={styles.boxInWindow}>
          {/* 2-1. 토글 버튼 -> Text atom 써서 다시 구현! */}
          <div className={styles.toggleButton}>
            {/* 채집 금지 구역 || 사용 가능 도구 */}
            <ToggleItem label="채집 금지 목록" value="prohibitedItems" />
            <span>|</span>
            <ToggleItem label="사용 가능 도구" value="availableTools" />
          </div>

          {/* 토글에 따라 내용 표시 */}
          <div>
            {toggle === 'prohibitedItems' ? <ProhibitedItemsContent /> : <AvailableToolsContent />}
          </div>
        </div>
      </div>
    </div>
  );
};
