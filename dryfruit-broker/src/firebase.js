import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAeD_8xKYPTjN2gnSQLqM1m_PYjQg0CBR0",
  authDomain: "user-detail-1bab6.firebaseapp.com",
  projectId: "user-detail-1bab6",
  storageBucket: "user-detail-1bab6.firebasestorage.app",
  messagingSenderId: "137982542197",
  appId: "1:137982542197:web:8a55e3cdb81cee28f2533c",
  measurementId: "G-3VR481K307"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
