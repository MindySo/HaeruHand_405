import { useState, type FC } from 'react';
import theme from '../../../theme';
import { Text } from '../../atoms';
import closeButtonImg from './closeButtonLightGray.png';

// 모달 닫기 버튼 props
interface InfoModalProps {
  onClose: () => void;
}

export const InfoModal: FC<InfoModalProps> = ({ onClose }) => {
  // 토글(기본값: 채집 금지 구역) 버튼 상태 관리
  // 채집 금지 구역(prohibitedArea) || 사용 가능 도구(availableTools)
  const [toggle, setToggle] = useState('prohibitedItems');

  // 반환 값: 모달 창
  return (
    <div
      className="modalWindow"
      style={{
        margin: theme.spacing.lg,
        backgroundColor: theme.colors.main,
        borderRadius: theme.borderRadius.xl,
        paddingTop: theme.spacing.lg,
        paddingBottom: 0,
        position: 'relative', // 닫기 버튼 배치를 위한 설정

        // 모달 창 크기(고정)
        width: 360,
        height: 400,
        boxSizing: 'border-box', // padding을 포함한 크기 계산
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
      <div
        className="boxInWindow"
        style={{
          backgroundColor: theme.colors.white,
          borderRadius: theme.borderRadius.xl,
          padding: theme.spacing.lg,

          // 내부 박스 크기
          margin: `0px ${theme.spacing.lg}`,
          height: 324,

          // 리스트 스크롤바를 위한 설정(높이 고정)
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* 2-1. 토글 버튼 -> state 사용 */}
        <div
          className="toggleButton"
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            fontSize: theme.typography.fontSize.lg,
            color: theme.colors.gray,
            marginBottom: theme.spacing.sm,

            // 리스트 스크롤바를 위한 설정(높이 고정)
            flex: '0 0 auto',
          }}
        >
          {/* 채집 금지 구역 || 사용 가능 도구 */}
          <div
            onClick={() => setToggle('prohibitedItems')}
            style={{
              cursor: 'pointer',
              color: toggle === 'prohibitedItems' ? theme.colors.white : theme.colors.gray,
              backgroundColor:
                toggle === 'prohibitedItems' ? theme.colors.main : theme.colors.white,
              borderRadius: toggle === 'prohibitedItems' ? theme.borderRadius.md : 'none',
              padding: `1px ${theme.spacing.sm}`,
            }}
          >
            채집 금지 목록
          </div>
          <span style={{ margin: 1 }}>|</span>
          <div
            onClick={() => setToggle('availableTools')}
            style={{
              cursor: 'pointer',
              color: toggle === 'availableTools' ? theme.colors.white : theme.colors.gray,
              backgroundColor: toggle === 'availableTools' ? theme.colors.main : theme.colors.white,
              borderRadius: toggle === 'availableTools' ? theme.borderRadius.md : 'none',
              padding: `1px ${theme.spacing.sm}`,
            }}
          >
            사용 가능 도구
          </div>
        </div>

        {/* 2-2. 소제목(내용) */}
        <div
          className="smallTitle"
          style={{
            fontSize: theme.typography.fontSize.md,
            padding: theme.spacing.sm, // 리스트 스크롤바를 위한 설정(높이 고정)
            flex: '0 0 auto',
          }}
        >
          {/* 채집 금지 구역 || 사용 가능 도구 */}
          {toggle === 'prohibitedItems' ? (
            <div>보호 중인 친구들이에요, 눈으로만 봐주세요!</div>
          ) : (
            <div>이건 써도 괜찮아요!</div>
          )}
        </div>

        {/* 2-3. 목록 */}
        <div
          className="list"
          // 임시 스타일링
          style={{
            fontSize: theme.typography.fontSize.lg,
            marginTop: theme.spacing.xs,
            // 내부 콘텐츠가 크기를 넘으면 스크롤바 표시(높이 설정을 해주어야 가능!)
            flexGrow: 1, // 내부 박스의 남은 공간 모두 차지
            overflowY: 'auto',
          }}
        >
          {/* 채집 금지 구역 || 사용 가능 도구 */}
          {toggle === 'prohibitedItems' ? (
            <div>
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
          ) : (
            <div>사용 가능 도구 리스트</div>
          )}
        </div>
      </div>
    </div>
  );
};
