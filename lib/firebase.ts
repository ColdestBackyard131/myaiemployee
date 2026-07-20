import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9f5qQTy06lusUI6Ocx6j9oEVjr-GmayU",
  authDomain: "my-ai-employee-33caa.firebaseapp.com",
  projectId: "my-ai-employee-33caa",
  storageBucket: "my-ai-employee-33caa.firebasestorage.app",
  messagingSenderId: "221706014646",
  appId: "1:221706014646:web:2cf9705d89812f53aa7b17",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
