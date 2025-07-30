import './App.css';
import { theme } from './theme';

function App() {
  return (
    <div className="App">
      {/* Typography 예시 */}
      <section style={{ marginBottom: theme.spacing.xxxl }}>
        <h1>H1 제목 - Pretendard Bold 28px</h1>
        <h2>H2 제목 - Pretendard Bold 24px</h2>
        <h3>H3 제목 - Pretendard SemiBold 20px</h3>
        <h4>H4 제목 - Pretendard SemiBold 18px</h4>
        <p>
          본문 텍스트 - Pretendard Regular 16px. 기본 폰트 방향은 허용된 리소스 내에서 가능한 한
          눈에 친숙하게 만들고, 폰트를 보는 데 추가적인 노력이 필요하지 않도록 만드는 것이었습니다.
        </p>
      </section>

      {/* Colors 예시 */}
      <section style={{ marginBottom: theme.spacing.xxxl }}>
        <h3>컬러 팔레트 예시</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: theme.spacing.md,
            marginTop: theme.spacing.lg,
          }}
        >
          <div
            style={{
              backgroundColor: theme.colors.primary.main,
              color: theme.colors.white,
              padding: theme.spacing.lg,
              borderRadius: theme.borderRadius.md,
              textAlign: 'center',
            }}
          >
            Primary Main
          </div>
          <div
            style={{
              backgroundColor: theme.colors.error.main,
              color: theme.colors.white,
              padding: theme.spacing.lg,
              borderRadius: theme.borderRadius.md,
              textAlign: 'center',
            }}
          >
            Error Main
          </div>
          <div
            style={{
              backgroundColor: theme.colors.success.main,
              color: theme.colors.white,
              padding: theme.spacing.lg,
              borderRadius: theme.borderRadius.md,
              textAlign: 'center',
            }}
          >
            Success Main
          </div>
          <div
            style={{
              backgroundColor: theme.colors.neutral.gray[300],
              color: theme.colors.white,
              padding: theme.spacing.lg,
              borderRadius: theme.borderRadius.md,
              textAlign: 'center',
            }}
          >
            Neutral Gray
          </div>
        </div>
      </section>

      {/* Buttons 예시 */}
      <section style={{ marginBottom: theme.spacing.xxxl }}>
        <h3>버튼 예시</h3>
        <div
          style={{
            display: 'flex',
            gap: theme.spacing.md,
            justifyContent: 'center',
            marginTop: theme.spacing.lg,
          }}
        >
          <button
            style={{
              backgroundColor: theme.colors.primary.main,
              color: theme.colors.white,
              padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
              borderRadius: theme.borderRadius.md,
              border: 'none',
              fontSize: theme.typography.textStyles.body.fontSize,
              fontWeight: theme.typography.textStyles.body.fontWeight,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Primary Button
          </button>
          <button
            style={{
              backgroundColor: theme.colors.error.main,
              color: theme.colors.white,
              padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
              borderRadius: theme.borderRadius.md,
              border: 'none',
              fontSize: theme.typography.textStyles.body.fontSize,
              fontWeight: theme.typography.textStyles.body.fontWeight,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Error Button
          </button>
          <button
            style={{
              backgroundColor: theme.colors.success.main,
              color: theme.colors.white,
              padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
              borderRadius: theme.borderRadius.md,
              border: 'none',
              fontSize: theme.typography.textStyles.body.fontSize,
              fontWeight: theme.typography.textStyles.body.fontWeight,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Success Button
          </button>
        </div>
      </section>

      {/* Spacing 예시 */}
      <section style={{ marginBottom: theme.spacing.xxxl }}>
        <h3>스페이싱 예시</h3>
        <div
          style={{
            backgroundColor: theme.colors.lightMain,
            padding: theme.spacing.lg,
            borderRadius: theme.borderRadius.md,
            marginTop: theme.spacing.lg,
          }}
        >
          <p style={{ marginBottom: theme.spacing.sm }}>
            xs: {theme.spacing.xs} | sm: {theme.spacing.sm} | md: {theme.spacing.md}
          </p>
          <p style={{ marginBottom: theme.spacing.sm }}>
            lg: {theme.spacing.lg} | xl: {theme.spacing.xl} | xxl: {theme.spacing.xxl}
          </p>
          <p>
            xxxl: {theme.spacing.xxxl} | xxxxl: {theme.spacing.xxxxl}
          </p>
        </div>
      </section>
    </div>
  );
}

export default App;
