import './App.css';
import { theme } from './theme';
import { Button, Badge, Text } from './components/atoms';
import { WarningBanner, HarvestButton, WeatherWidgets } from './components/molecules';
import { Link } from '@tanstack/react-router';

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
          공통컴포넌트 - Atom & Molecule
        </Text>
      </div>

      {/* Navigation */}
      <div style={{ marginBottom: theme.spacing.xxxl }}>
        <Text size="lg" color="white" style={{ marginBottom: theme.spacing.md }}>
          페이지 이동:
        </Text>
        <div style={{ display: 'flex', gap: theme.spacing.md }}>
          <Link to="/weather-alert" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="medium">
              WeatherAlertPage
            </Button>
          </Link>
          <Link to="/kyumin" style={{ textDecoration: 'none' }}>
            <Button variant="secondary" size="medium">
              Kyumin Page
            </Button>
          </Link>
        </div>
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
          <Badge variant="neutral" size="small" style={{ borderRadius: '100px' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: theme.colors.warning,
                borderRadius: '50%',
                marginRight: theme.spacing.xs,
              }}
            />
            채집금지구역
          </Badge>
        </div>
      </section>

      {/* Molecule Components Section */}
      <section style={{ marginBottom: theme.spacing.xxxl }}>
        <Text size="xxxl" color="white" style={{ marginBottom: theme.spacing.lg }}>
          Molecule 컴포넌트들
        </Text>

        {/* Warning Banner */}
        <div style={{ marginBottom: theme.spacing.lg }}>
          <Text size="lg" color="white" style={{ marginBottom: theme.spacing.md }}>
            WarningBanner
          </Text>
          <WarningBanner type="풍랑주의보" date="07월 24일 22시 00분" location="제주 앞바다" />
        </div>

        {/* Harvest Button */}
        <div style={{ marginBottom: theme.spacing.lg }}>
          <Text size="lg" color="white" style={{ marginBottom: theme.spacing.md }}>
            HarvestButton
          </Text>
          <HarvestButton onClick={() => console.log('수확물 확인!')} />
        </div>

        {/* Weather Widgets */}
        <div style={{ marginBottom: theme.spacing.lg }}>
          <Text size="lg" color="white" style={{ marginBottom: theme.spacing.md }}>
            WeatherWidgets
          </Text>
          <WeatherWidgets
            items={[
              {
                icon: (
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      background: '#ffd700',
                      borderRadius: '50%',
                    }}
                  />
                ),
                subtitle: '현재 날씨',
                data: '32.7℃ / 맑음',
              },
              {
                icon: (
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      background: '#4CAF50',
                      borderRadius: '50%',
                    }}
                  />
                ),
                subtitle: '위험도',
                data: '보통',
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
