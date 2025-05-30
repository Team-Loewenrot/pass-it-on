// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDT1IGLEdecTKKWqLDNOk6XWftI5UJStX8",
    authDomain: "pass-it-on-a12db.firebaseapp.com",
    projectId: "pass-it-on-a12db",
    storageBucket: "pass-it-on-a12db.appspot.com",
    messagingSenderId: "997671569274",
    appId: "1:997671569274:web:93e4187776a0d9b810b8c3",
    measurementId: "G-0HCZ24FB88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };