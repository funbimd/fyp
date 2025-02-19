// Import Firebase SDK modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration with environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Use VITE_ prefix
  authDomain: "travela-9367b.firebaseapp.com",
  projectId: "travela-9367b",
  storageBucket: "travela-9367b.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "822933517490",
  appId: "1:822933517490:web:e3285e631e8ad4508d45ab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
