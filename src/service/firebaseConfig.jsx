// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqh2pAH-K54UfU2JtvtyuzAcsRoM1O54M",
  authDomain: "travela-9367b.firebaseapp.com",
  projectId: "travela-9367b",
  storageBucket: "travela-9367b.appspot.com",
  messagingSenderId: "822933517490",
  appId: "1:822933517490:web:e3285e631e8ad4508d45ab",
  measurementId: "G-3S52VKQV84",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
