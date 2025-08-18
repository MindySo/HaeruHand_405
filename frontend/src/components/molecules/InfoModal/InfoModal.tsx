import { useState, type FC } from 'react';
import theme from '../../../theme';
import { Text } from '../../atoms';
import closeButtonImg from 'closeButtonLightGray.png';
import styles from './InfoModal.module.css';
import { banData, type BanRule } from './banData';

// 모달 닫기 버튼 props
interface InfoModalProps {
  onClose: () => void;
}

// toggle 상태 타입
type ToggleState = 'prohibitedItems' | 'availableTools';

// 오늘이 금어기인지 확인하는 함수
const isTodayInBan = (start: string, end: string, todayMMDD: string): boolean => {
  if (start <= end) {
    return todayMMDD >= start && todayMMDD <= end;
  } else {
    return todayMMDD >= start || todayMMDD <= end;
  }
};

// 오늘 기준 금어기 어종 추출
const getTodayBanList = (data: BanRule[], today: Date): BanRule[] => {
  const todayMMDD = today.toISOString().slice(5, 10); // "MM-DD"
  return data.filter((rule) => isTodayInBan(rule.start, rule.end, todayMMDD));
};

export const InfoModal: FC<InfoModalProps> = ({ onClose }) => {
  // 토글(기본값: 채집 금지 목록) 버튼 상태 관리
  // 채집 금지 목록(prohibitedItems) || 사용 가능 도구(availableTools)
  const [toggle, setToggle] = useState<ToggleState>('prohibitedItems');
  const today = new Date();
  const todayBanList = getTodayBanList(banData, today);

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
        <div>
          <Text
            size="md"
            style={{
              margin: `${theme.spacing.lg} ${theme.spacing.sm} 0`,
              flex: '0 0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            보호 중인 친구들이에요,
          </Text>
          <Text
            size="md"
            style={{
              margin: `${theme.spacing.xs} ${theme.spacing.sm} ${theme.spacing.md}`,
              flex: '0 0 auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            눈으로만 봐주세요!
          </Text>
        </div>
        {/* 내용1(목록) */}
        <div className={styles.list}>
          {todayBanList.length === 0 ? (
            <li className={styles.listItem}>오늘 금어기 어종이 없습니다</li>
          ) : (
            <table className={styles.banTable}>
              <thead>
                <tr>
                  <th>어종명</th>
                  {/* <th>금어기 기간</th> */}
                  <th>금지 체장/체중</th>
                  {/* <th>비고</th> */}
                </tr>
              </thead>
              <tbody>
                {todayBanList.map((rule) => (
                  <tr key={rule.species}>
                    <td>{rule.species}</td>
                    {/* <td>
                      {rule.start} ~ {rule.end}
                      </td> */}
                    <td>{rule.minLength || rule.minWeight || '-'}</td>
                    {/* <td>{rule.note || '-'}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
            height: '65px',
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
          <li className={styles.listItem}>
            <img src="/투망.png" alt="투망" />
            <Text
              size="md"
              style={{
                margin: `${theme.spacing.md} 0 ${theme.spacing.sm}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              투망
            </Text>
            <Text
              size="sm"
              color="gray"
              style={{
                marginBottom: theme.spacing.md,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              그물 아래 둘레 25m 초과하면 안 됨
            </Text>
          </li>
          <li className={styles.listItem}>
            <img src="/뜰채(쪽지).png" alt="뜰채" />
            <Text
              size="md"
              style={{
                margin: `${theme.spacing.md} 0 ${theme.spacing.sm}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              뜰채(쪽지)
            </Text>
            <Text
              size="sm"
              color="gray"
              style={{
                marginBottom: theme.spacing.md,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              테의 가장 긴 변의 길이(테가 원형인 경우에는 지름의 길이)는 1m를 초과해서는 안 됨
            </Text>
          </li>
          <li className={styles.listItem}>
            <img src="/반두(쪽대).png" alt="반두" />
            <Text
              size="md"
              style={{
                margin: `${theme.spacing.md} 0 ${theme.spacing.sm}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              반두(쪽대)
            </Text>
            <Text
              size="sm"
              color="gray"
              style={{
                marginBottom: theme.spacing.md,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              그물의 가장 긴 변이 2m를 초과해서는 안 됨
            </Text>
          </li>
          <li className={styles.listItem}>
            <img src="/손들망.png" alt="손들망" />
            <Text
              size="md"
              style={{
                margin: `${theme.spacing.md} 0 ${theme.spacing.sm}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              손들망
            </Text>
            <Text
              size="sm"
              color="gray"
              style={{
                marginBottom: theme.spacing.md,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              그물의 가장 긴 변(틀이나 테가 원형인 경우에는 지름의 길이)는 2m를 초과해서는 안 됨
            </Text>
          </li>
          <li className={styles.listItem}>
            <img src="/외줄낚시.png" alt="외줄낚시" />
            <Text
              size="md"
              style={{
                margin: `${theme.spacing.md}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              외줄낚시
            </Text>
          </li>
          <li className={styles.listItem}>
            <img src="/가리.png" alt="가리" />
            <Text
              size="md"
              style={{
                margin: `${theme.spacing.md} 0 ${theme.spacing.sm}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              가리
            </Text>
            <Text
              size="sm"
              color="gray"
              style={{
                marginBottom: theme.spacing.md,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              가로ㆍ세로ㆍ높이의 길이(원통형인 경우는 지름)는 각각 80cm를 초과해서는 안 됨
            </Text>
          </li>
          <li className={styles.listItem}>
            <img src="/통발.png" alt="통발" />
            <Text
              size="md"
              style={{
                margin: `${theme.spacing.md} 0 ${theme.spacing.sm}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              통발
            </Text>
            <Text
              size="sm"
              color="gray"
              style={{
                marginBottom: theme.spacing.md,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              가로ㆍ세로ㆍ높이의 길이(원통형인 경우는 지름)는 각각 80cm를 초과해서는 안 되며, 통발의
              개수는 1개를 초과해서는 안 됨
            </Text>
          </li>
          <li className={styles.listItem}>
            <img src="/낫대.png" alt="낫대" />
            <Text
              size="md"
              style={{
                margin: `0 0 ${theme.spacing.md}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              낫대
            </Text>
          </li>
          <li className={styles.listItem}>
            <img src="/집게.png" alt="집게" />
            <Text
              size="md"
              style={{
                margin: `${theme.spacing.md}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              집게
            </Text>
          </li>
          <li className={styles.listItem}>
            <img src="/갈고리.png" alt="갈고리" />
            <Text
              size="md"
              style={{
                margin: `${theme.spacing.md}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              갈고리
            </Text>
          </li>
          <li className={styles.listItem}>
            <img src="/호미.png" alt="호미" />
            <Text
              size="md"
              style={{
                margin: `${theme.spacing.md}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              호미
            </Text>
          </li>
          <li className={styles.listItem}>
            <img src="/삽.png" alt="삽" />
            <Text
              size="md"
              style={{
                margin: `${theme.spacing.md}`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              삽
            </Text>
          </li>
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
            src="/closeButtonLightGray.png"
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
