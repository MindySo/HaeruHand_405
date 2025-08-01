import theme from '../../../theme';
import { Text } from '../../atoms';
import closeButtonImg from './closeButton.png';

export const InfoModal = () => {
  return (
    <div
      className="modalWindow"
      style={{
        backgroundColor: theme.colors.main,
        borderRadius: theme.borderRadius.lg,
        padding: theme.spacing.sm,
        paddingTop: theme.spacing.sm,
        position: 'relative', // 닫기 버튼 배치를 위한 설정
      }}
    >
      {/* 1. 모달 창 헤더 */}
      {/* 1-1. 창 제목 */}
      <header
        className="headerTitle"
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: theme.colors.white, fontSize: theme.typography.fontSize.sm }}>
          채집 안내서
        </Text>
      </header>
      {/* 1-2. 닫기 버튼 -> 우 상단에 고정(일단 임시로 png 넣어두었습니다) */}
      <div
        className="closeModal"
        style={{
          color: theme.colors.lightGray, // svg인 경우에 색상 변경 가능이라 추후 변경 예정
          position: 'absolute',
          top: theme.spacing.xs,
          right: theme.spacing.xs,
          // png 크기 조절
          width: 20,
          height: 20,
        }}
      >
        <img src={closeButtonImg} alt="close" style={{ cursor: 'pointer', display: 'block' }} />
      </div>

      {/* 2. 모달 창 내부 (헤더 아래) 박스 */}
      <div
        className="boxInWindow"
        style={{
          backgroundColor: theme.colors.white,
          borderRadius: theme.borderRadius.lg,
          padding: theme.spacing.md,
        }}
      >
        {/* 2-1. 토글 버튼 -> state 사용 */}
        <div
          className="toggleButton"
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.gray,
          }}
        >
          {/* 채집 금지 구역 || 사용 가능 도구 */}
          <div>채집 금지 구역</div>
          <span>/</span>
          <div>사용 가능 도구</div>
        </div>

        {/* 2-2. 소제목(내용) */}
        <div className="smallTitle" style={{ fontSize: theme.typography.fontSize.xs }}>
          {/* 채집 금지 구역 || 사용 가능 도구 */}
          <div>보호 중인 친구들이에요, 눈으로만 봐주세요!</div>
          <div>이건 써도 괜찮아요!</div>
        </div>

        {/* 2-3. 목록 */}
        <div className="list">
          {/* 채집 금지 구역 || 사용 가능 도구 */}
          <div>채집 금지 구역</div>
          <div>사용 가능 도구</div>
        </div>
      </div>
    </div>
  );
};
