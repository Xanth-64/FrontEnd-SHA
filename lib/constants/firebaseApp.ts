// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'backend-sha.firebaseapp.com',
  projectId: 'backend-sha',
  storageBucket: 'backend-sha.appspot.com',
  messagingSenderId: '85106265404',
  appId: '1:85106265404:web:0d389e032c618046826239',
  measurementId: 'G-4MNEZ7C75X',
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
