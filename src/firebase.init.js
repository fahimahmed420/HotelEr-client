// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhCFA6IroxsnnIt_ugPmRfCJQ5OiKOIuI",
  authDomain: "assignment-11-59a34.firebaseapp.com",
  projectId: "assignment-11-59a34",
  storageBucket: "assignment-11-59a34.firebasestorage.app",
  messagingSenderId: "921642405231",
  appId: "1:921642405231:web:b1ab22445715124cd52c9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();