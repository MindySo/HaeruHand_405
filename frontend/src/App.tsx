import './App.css';
import { theme } from './theme';
import { Button, Badge, Text, Icon, MapMarker } from './components/atoms';

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundColor: '#2A2A2A',
        minHeight: '100vh',
        padding: theme.spacing.xxxl,
        fontFamily: theme.typography.fontFamily.primary,
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: theme.colors.dark,
          color: theme.colors.white,
          padding: `${theme.spacing.sm} ${theme.spacing.md}`,
          borderRadius: theme.borderRadius.sm,
          marginBottom: theme.spacing.xxxl,
          display: 'inline-block',
        }}
      >
        <Text size="lg" color="white">
          공통컴포넌트 - Atom
        </Text>
      </div>

      {/* Text Section */}
      <section style={{ marginBottom: theme.spacing.xxxl }}>
        <Text size="xxxl" color="white" style={{ marginBottom: theme.spacing.lg }}>
          텍스트
        </Text>
        <Text size="md" color="white">
          본문 텍스트 - Pretendard Regular 16px
        </Text>
      </section>

      {/* Button Section */}
      <section style={{ marginBottom: theme.spacing.xxxl }}>
        <Text size="xxxl" color="white" style={{ marginBottom: theme.spacing.lg }}>
          버튼
        </Text>
        <div
          style={{
            display: 'flex',
            gap: theme.spacing.md,
            alignItems: 'center',
          }}
        >
          <Button variant="primary" size="medium">
            업로드하기
          </Button>
          <Button variant="secondary" size="medium">
            그만하기
          </Button>
          <Button variant="error" size="medium">
            그만하기
          </Button>
        </div>
      </section>

      {/* Badge Section */}
      <section style={{ marginBottom: theme.spacing.xxxl }}>
        <Text size="xxxl" color="white" style={{ marginBottom: theme.spacing.lg }}>
          뱃지
        </Text>
        <div
          style={{
            display: 'flex',
            gap: theme.spacing.md,
            alignItems: 'center',
          }}
        >
          <Badge variant="error" size="small">
            풍랑주의보
          </Badge>
          <Badge variant="neutral" size="small">
            풍랑주의보
          </Badge>
        </div>
      </section>

      {/* Icon Section */}
      <section style={{ marginBottom: theme.spacing.xxxl }}>
        <Text size="xxxl" color="white" style={{ marginBottom: theme.spacing.lg }}>
          아이콘
        </Text>
        <div
          style={{
            display: 'flex',
            gap: theme.spacing.md,
            alignItems: 'center',
          }}
        >
          <Icon size="large" color="main">
            ⛏️
          </Icon>
        </div>
      </section>

      {/* Map Marker Section */}
      <section style={{ marginBottom: theme.spacing.xxxl }}>
        <Text size="xxxl" color="white" style={{ marginBottom: theme.spacing.lg }}>
          맵마커
        </Text>
        <div
          style={{
            display: 'flex',
            gap: theme.spacing.md,
            alignItems: 'center',
          }}
        >
          <MapMarker size="medium" color="warning" />
        </div>
      </section>
    </div>
  );
}

export default App;
