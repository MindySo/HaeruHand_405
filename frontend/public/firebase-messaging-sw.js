importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyB6zO4euaX3bhPUBi-HFuF7rlkPs4AoKjk",
  authDomain: "haeruhand-e75bf.firebaseapp.com",
  projectId: "haeruhand-e75bf",
  storageBucket: "haeruhand-e75bf.firebasestorage.app",
  messagingSenderId: "418951530336",
  appId: "1:418951530336:web:81509cfbac299a6d4ac005",
  measurementId: "G-6H0X5S11CR"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 백그라운드 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log('백그라운드 메시지 수신:', payload);

  const notificationTitle = payload.notification?.title || '알림';
  const notificationOptions = {
    body: payload.notification?.body || '새로운 메시지가 도착했습니다.',
    icon: '/haeruhand_app.png', // 선택사항
    tag: 'fcm-notification',
    requireInteraction: true, // 사용자가 클릭할 때까지 유지
    data: payload.data || {} // 추가 데이터
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
