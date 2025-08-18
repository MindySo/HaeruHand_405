import React, { useState } from 'react';
import { useFCM } from '../../../hooks/useFCM';
import { Button, Text } from '../../atoms';
import { theme } from '../../../theme';
import './FCMTestPanel.module.css';

export const FCMTestPanel: React.FC = () => {
  const { initializeFCM, sendNotification, checkFCMService, token, tokenId, isRegistered, error } =
    useFCM();

  const [notificationTitle, setNotificationTitle] = useState('테스트 알림');
  const [notificationBody, setNotificationBody] = useState('이것은 테스트 알림입니다.');
  const [testUserId, setTestUserId] = useState('1');

  const handleInitializeFCM = async () => {
    const success = await initializeFCM(parseInt(testUserId));
    if (success) {
      console.log('FCM 초기화 성공');
    }
  };

  const handleSendNotification = async () => {
    if (!token) {
      alert('FCM 토큰이 없습니다. 먼저 FCM을 초기화해주세요.');
      return;
    }

    const result = await sendNotification({
      token: token,
      title: notificationTitle,
      body: notificationBody,
    });

    if (result) {
      console.log('알림 전송 성공:', result);
      alert('알림 전송 성공!');
    } else {
      alert('알림 전송 실패');
    }
  };

  const handleCheckService = async () => {
    const isHealthy = await checkFCMService();
    if (isHealthy) {
      alert('FCM 서비스가 정상 동작 중입니다');
    } else {
      alert('FCM 서비스에 문제가 있습니다');
    }
  };

  return (
    <div
      style={{
        backgroundColor: theme.colors.dark,
        padding: theme.spacing.lg,
        borderRadius: theme.borderRadius.md,
        marginBottom: theme.spacing.lg,
      }}
    >
      <Text size="lg" color="white" style={{ marginBottom: theme.spacing.md }}>
        FCM 테스트 패널
      </Text>

      {/* 상태 정보 */}
      <div style={{ marginBottom: theme.spacing.md }}>
        <Text size="sm" color="white">
          등록 상태: {isRegistered ? '✅ 등록됨' : '❌ 미등록'}
        </Text>
        <Text size="sm" color="white">
          토큰 ID: {tokenId || '없음'}
        </Text>
        <Text size="sm" color="white">
          토큰: {token ? `${token.substring(0, 20)}...` : '없음'}
        </Text>
        {error && (
          <Text size="sm" color="warning" style={{ marginTop: theme.spacing.xs }}>
            오류: {error}
          </Text>
        )}
      </div>

      {/* FCM 초기화 */}
      <div style={{ marginBottom: theme.spacing.md }}>
        <Text size="md" color="white" style={{ marginBottom: theme.spacing.sm }}>
          FCM 초기화
        </Text>
        <div style={{ display: 'flex', gap: theme.spacing.sm, alignItems: 'center' }}>
          <input
            type="number"
            value={testUserId}
            onChange={(e) => setTestUserId(e.target.value)}
            placeholder="사용자 ID"
            style={{
              padding: theme.spacing.sm,
              borderRadius: theme.borderRadius.sm,
              border: 'none',
              width: '100px',
            }}
          />
          <Button variant="primary" size="small" onClick={handleInitializeFCM}>
            FCM 초기화
          </Button>
        </div>
      </div>

      {/* 알림 전송 */}
      {isRegistered && (
        <div style={{ marginBottom: theme.spacing.md }}>
          <Text size="md" color="white" style={{ marginBottom: theme.spacing.sm }}>
            알림 전송
          </Text>
          <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.sm }}>
            <input
              type="text"
              value={notificationTitle}
              onChange={(e) => setNotificationTitle(e.target.value)}
              placeholder="알림 제목"
              style={{
                padding: theme.spacing.sm,
                borderRadius: theme.borderRadius.sm,
                border: 'none',
              }}
            />
            <input
              type="text"
              value={notificationBody}
              onChange={(e) => setNotificationBody(e.target.value)}
              placeholder="알림 내용"
              style={{
                padding: theme.spacing.sm,
                borderRadius: theme.borderRadius.sm,
                border: 'none',
              }}
            />
            <Button variant="secondary" size="small" onClick={handleSendNotification}>
              알림 전송
            </Button>
          </div>
        </div>
      )}

      {/* 서비스 상태 확인 */}
      <div>
        <Text size="md" color="white" style={{ marginBottom: theme.spacing.sm }}>
          서비스 상태
        </Text>
        <Button variant="secondary" size="small" onClick={handleCheckService}>
          서비스 상태 확인
        </Button>
      </div>
    </div>
  );
};
