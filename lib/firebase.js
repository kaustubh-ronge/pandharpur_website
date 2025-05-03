import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1O8-kI9EqIjiVHTM1i8oWso_kYpnIff4",
  authDomain: "pandharpur-website.firebaseapp.com",
  projectId: "pandharpur-website",
  storageBucket: "pandharpur-website.firebasestorage.app",
  messagingSenderId: "548917022769",
  appId: "1:548917022769:web:8ed200403622df6cec0510",
  measurementId: "G-W8RQHR6RT4"
};

// Initialize Firebase only on client side
const app = typeof window !== 'undefined' ? initializeApp(firebaseConfig) : null;
const db = app ? getFirestore(app) : null;

export { db };