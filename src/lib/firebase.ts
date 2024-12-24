import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCCLOiVX1ZYXx6_3JxDWiYzBs8rbP1RC58",
  authDomain: "code-crafter-8e426.firebaseapp.com",
  projectId: "code-crafter-8e426",
  storageBucket: "code-crafter-8e426.appspot.com",
  messagingSenderId: "10861357014",
  appId: "1:10861357014:web:ff46a1a17cb237e3fd2677",
  measurementId: "G-RPBM634Z8V"
};

// Initialize Firebase only if it hasn't been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);

// Only initialize messaging if the browser supports it
let messaging;
try {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    const { getMessaging } = require('firebase/messaging');
    messaging = getMessaging(app);
  }
} catch (error) {
  console.log('Firebase messaging is not supported in this browser');
}

export { messaging };
export default app;