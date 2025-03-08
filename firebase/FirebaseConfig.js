import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: 'AIzaSyCOJA1_nNoUwU3_WU-u1Bpud3XuOfNsJ-A',
  authDomain: 'locationapplikation.firebaseapp.com',
  projectId: 'locationapplikation',
  storageBucket: 'locationapplikation.firebasestorage.app',
  messagingSenderId: '296236192373',
  appId: '1:296236192373:web:2c308fd6ab5b01a0a81e3c'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);