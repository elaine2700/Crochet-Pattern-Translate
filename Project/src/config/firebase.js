// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from 'firebase/firestore/lite';
import {getStorage, ref} from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.C_FIREBASE_APIKEY,
  authDomain: import.meta.env.C_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.C_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.C_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.C_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.C_FIREBASE_APPID,
  measurementId: import.meta.env.C_FIREBASE_MEASUREMENTID,
  storageBucket: import.meta.env.C_FIREBASE_STORAGEBUCKET_2
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db_id=import.meta.env.C_DB_ID;
//const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app,db_id);

// Image Folder Ref
export const storage = getStorage();
export const imagesFolderRef = ref(storage, 'images');

export default app;

