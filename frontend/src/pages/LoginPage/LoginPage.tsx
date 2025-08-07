import { Button, Text } from '../../components/atoms';
import styles from './Loginpage.module.css';

export const LoginPage = () => {
  return (
    <div className={styles.window}>
      <div className={styles.textSection}>
        <Text size="xxxl" weight="medium" align="center">
          다함께, 즐겁게
        </Text>
        <Text size="xxxl" weight="medium" align="center">
          해루핸
        </Text>
      </div>

      <div className={styles.buttonSection}>
        <Button size="large" fullWidth className={styles.kakaoButton}>
          카카오로 로그인
        </Button>
        <Button size="large" fullWidth className={styles.guestButton}>
          게스트로 사용하기
        </Button>
      </div>
    </div>
  );
};
