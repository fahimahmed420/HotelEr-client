// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_ydsb-qvYyaY2FdMEeYjvQ8jcXLbdUXs",
  authDomain: "assignmnet10-907ca.firebaseapp.com",
  projectId: "assignmnet10-907ca",
  storageBucket: "assignmnet10-907ca.firebasestorage.app",
  messagingSenderId: "880199510264",
  appId: "1:880199510264:web:2d7b04c53d8fe2a8ecf30d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();