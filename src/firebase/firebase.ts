// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbflxsSvWrXsvrhMzXs_lPXR_aHzjjt5s",
  authDomain: "wanderweave-9873e.firebaseapp.com",
  projectId: "wanderweave-9873e",
  storageBucket: "wanderweave-9873e.appspot.com",
  messagingSenderId: "888025677349",
  appId: "1:888025677349:web:61feee7a8ed504e482c9cc",
  measurementId: "G-Q0TZ137G7N"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const analytics: Analytics = getAnalytics(app);
const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, analytics, db };
