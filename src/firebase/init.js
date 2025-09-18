// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5nLSoGeBOqDPTtljjh8wlJpXZiSSAQMg",
  authDomain: "fit5032-efolio-c84c9.firebaseapp.com",
  projectId: "fit5032-efolio-c84c9",
  storageBucket: "fit5032-efolio-c84c9.firebasestorage.app",
  messagingSenderId: "408208296290",
  appId: "1:408208296290:web:08039bbac30842bdb6043b",
  measurementId: "G-EQ5ZKBDKZL"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore()
export default db

