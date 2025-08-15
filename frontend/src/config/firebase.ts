import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Firebase 설정
const firebaseConfig = {
  apiKey: 'AIzaSyB6zO4euaX3bhPUBi-HFuF7rlkPs4AoKjk',
  authDomain: 'haeruhand-e75bf.firebaseapp.com',
  projectId: 'haeruhand-e75bf',
  storageBucket: 'haeruhand-e75bf.firebasestorage.app',
  messagingSenderId: '418951530336',
  appId: '1:418951530336:web:81509cfbac299a6d4ac005',
  measurementId: 'G-6H0X5S11CR',
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
