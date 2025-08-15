import { Text } from '../../atoms';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <img src="/해루핸로고.svg" alt="로고" className={styles.logo} />
      </div>

      <div className={styles.description}>
        <Text size="sm" weight="regular" style={{ color: 'gray' }}>
          실시간 위치 공유부터 AI 어종 판별까지 해루질의 모든 것을 담은 스마트 플랫폼,
        </Text>
        <Text size="md" weight="semiBold" style={{ color: 'gray', margin: '4px 0px 2px 12px' }}>
          해루핸
        </Text>
        <Text size="sm" weight="regular" style={{ color: 'gray' }}>
          입니다
        </Text>
      </div>

      <div className={styles.line}></div>

      <div className={styles.callPublic}>
        <Text size="sm" weight="semiBold" style={{ color: 'gray' }}>
          공공기관 연락처
        </Text>
        <Text size="sm" color="gray">
          제주도청 | 064-120 (유료 07시~22시, 연중무휴)
        </Text>
        <Text size="sm" color="gray" style={{ margin: '0px 0px 20px 52px' }}>
          | 064-710-2222 (야간/공휴일 전환)
        </Text>
        <Text size="sm" color="gray">
          제주지방해양경찰서 | 064-801-2000
        </Text>
        <Text size="sm" color="gray">
          제주시 해양경찰서 | 064-766-2000
        </Text>
        <Text size="sm" color="gray">
          서귀포시 해양경찰서 | 064-793-2000
        </Text>
      </div>
      <div className={styles.callVillage}>
        <Text size="sm" weight="semiBold" style={{ color: 'gray' }}>
          어촌계 연락처
        </Text>
        <Text size="sm" color="gray">
          구엄 | 064-720-3106
        </Text>
        <Text size="sm" color="gray">
          고내 | 064-720-3106
        </Text>
        <Text size="sm" color="gray">
          애월 | 064-720-3106
        </Text>
        <Text size="sm" color="gray">
          수원 | 064-795-0514
        </Text>
      </div>

      <div className={styles.appLaunch}>
        <Text size="sm" weight="semiBold" style={{ color: 'gray' }}>
          해루핸 출시일
        </Text>
        <Text size="sm" color="gray">
          2025.08.18
        </Text>
      </div>

      <div>
        <Text size="sm" weight="semiBold" style={{ color: 'gray' }}>
          해루핸 문의
        </Text>
        <Text size="sm" color="gray">
          ssafy@ssafy.com
        </Text>
      </div>
    </div>
  );
};
