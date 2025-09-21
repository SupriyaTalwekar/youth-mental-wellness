// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 👇 paste your own Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyDS_AYmfTTxMh2ZAdJRNly-Arkazw2CoEw",
  authDomain: "youth-mental-wellness-35bf4.firebaseapp.com",
  projectId: "youth-mental-wellness-35bf4",
  storageBucket: "youth-mental-wellness-35bf4.firebasestorage.app",
  messagingSenderId: "1023411884263",
  appId: "1:1023411884263:web:8499d1f975e5596d6dd242",
  measurementId: "G-9ZC7X15DN8",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auto sign in anonymously when app loads
signInAnonymously(auth)
  .then(() => console.log("Signed in anonymously"))
  .catch((err) => console.error("Auth error", err));
