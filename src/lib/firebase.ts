import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';

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
export const messaging = getMessaging(app);

export default app;