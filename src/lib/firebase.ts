// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCLOiVX1ZYXx6_3JxDWiYzBs8rbP1RC58",
  authDomain: "code-crafter-8e426.firebaseapp.com",
  projectId: "code-crafter-8e426",
  storageBucket: "code-crafter-8e426.firebasestorage.app",
  messagingSenderId: "10861357014",
  appId: "1:10861357014:web:ff46a1a17cb237e3fd2677",
  measurementId: "G-RPBM634Z8V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);