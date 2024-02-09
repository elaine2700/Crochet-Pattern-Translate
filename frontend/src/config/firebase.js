// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJbp-L1U1FXL40FxDdP0P0eJoi1dOUrvA",
  authDomain: "crochetspacecraft.firebaseapp.com",
  projectId: "crochetspacecraft",
  storageBucket: "crochetspacecraft.appspot.com",
  messagingSenderId: "1060564792132",
  appId: "1:1060564792132:web:6cec15f4eec1bdcca2dd11",
  measurementId: "G-50ZPHZJG6L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;

