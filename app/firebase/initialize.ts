import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCVv6YOKp1dKTQ4VZcFTC-myRYxepEDK28",
  authDomain: "accounting-f198c.firebaseapp.com",
  projectId: "accounting-f198c",
  storageBucket: "accounting-f198c.firebasestorage.app",
  messagingSenderId: "1041580266939",
  appId: "1:1041580266939:web:9e1a1a9364a75acc1b209e",
  measurementId: "G-9JLD8BF0K4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);



