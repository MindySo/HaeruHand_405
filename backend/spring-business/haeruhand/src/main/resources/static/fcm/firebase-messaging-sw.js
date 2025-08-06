// Firebase 서비스 워커 (수정 버전)
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyD6V17pyg4QNyV_QQXV5if9brML8nGEu5c",
    authDomain: "haeruhand-b0ca7.firebaseapp.com",
    projectId: "haeruhand-b0ca7",
    storageBucket: "haeruhand-b0ca7.firebasestorage.app",
    messagingSenderId: "983094973633",
    appId: "1:983094973633:web:3b81d27322fff0b581b040",
    measurementId: "G-F4VLBQBWMN"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 백그라운드 메시지 처리 (항상 알림 표시)
messaging.onBackgroundMessage((payload) => {
    console.log('[Service Worker] 백그라운드 메시지 수신:', payload);
    
    const notificationTitle = payload.notification?.title || '알림';
    const notificationOptions = {
        body: payload.notification?.body || '새로운 메시지가 도착했습니다.',
        icon: '/firebase-logo.png', // 선택사항
        tag: 'fcm-notification',
        requireInteraction: true, // 사용자가 클릭할 때까지 유지
        data: payload.data || {} // 추가 데이터
    };

    console.log('[Service Worker] 알림 표시:', notificationTitle, notificationOptions);
    
    // 알림 표시
    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// 알림 클릭 처리
self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] 알림 클릭:', event.notification);
    
    event.notification.close();
    
    // 페이지로 포커스 이동
    event.waitUntil(
        clients.matchAll({ type: 'window' }).then((clientList) => {
            for (const client of clientList) {
                if (client.url === location.origin && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});